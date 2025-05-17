export type Colour = [r: number, g: number, b: number];
export type ModList = Map<VehicleModType, number>;


import isPromise from "is-promise";
import Vector3 from "Vector3";
import { OnScreenKeyboardStatus, SeatPosition, VehicleModType, WindowTitle } from "Data/ParamEnums";
import getConfig from "Config";
import { VehicleHash } from "Data/VehicleHash";

export type Model = number | string;

export const RUNNING_ON_SERVER = IsDuplicityVersion();
export const RUNNING_ON_CLIENT = !RUNNING_ON_SERVER;

export function notify(message: string, isImportant = false, showOnInfoTab = false) {
    SetNotificationTextEntry('STRING');
    AddTextComponentString(message);
    DrawNotification(isImportant, showOnInfoTab);
}

export async function loadModel(model: Model, timeoutMs = 5000, silent = true): Promise<boolean> {
    if (!silent) {
        console.log(`Loading model ${model}...`);
    }

    const timeout = Date.now() + timeoutMs;

    RequestModel(model);

    while (!HasModelLoaded(model)) {
        await delay(1);

        if (Date.now() > timeout) {
            console.log(`Failed to load model ${model} after ${timeoutMs} milliseconds!`);
            return false;
        }
    }

    if (!silent) {
        console.log(`Loaded model ${model}...`);
    }

    return true;
}

export async function loadAnimDict(animation: string, timeoutMs = 5000): Promise<boolean> {
    console.log(`Loading animation ${animation}...`);

    const timeout = Date.now() + timeoutMs;
    const parts = animation.split('@');

    for (const i of [...Array(parts.length)].keys()) {
        const dictToLoad = parts.slice(0, i + 1).join('@');
        console.log(`Loading dict ${dictToLoad}...`);
        RequestAnimDict(dictToLoad);
    }

    while (Date.now() < timeout && !HasAnimDictLoaded(animation)) {
        await delay(1);
    }

    if (!DoesAnimDictExist(animation) || !HasAnimDictLoaded(animation)) {
        console.log(`Failed to load animation '${animation}' after ${timeoutMs} milliseconds!`);
        return false;
    }

    return true;
}

export function sendUIMessage(message: object) {
    SendNUIMessage(message);
}

export async function getUserInput(maxLength: number, windowTitle = WindowTitle.FMMC_KEY_TIP8, defaultText = '') {
    showKeyboard(maxLength, windowTitle, defaultText);

    while (UpdateOnscreenKeyboard() === OnScreenKeyboardStatus.OSK_PENDING) {
        await delay(0);
    }

    return GetOnscreenKeyboardResult();
}

export function showKeyboard(maxLength: number, windowTitle = WindowTitle.FMMC_KEY_TIP8, defaultText = '') {
    DisplayOnscreenKeyboard(1, windowTitle.toString(), null, defaultText, null, null, null, maxLength + 1)
}

export function delay(ms: number): Promise<CitizenTimer> {
    return new Promise(res => setTimeout(res, ms, null));
}

export function sendChatMessage(message: string, name: string | null = null, multiline: boolean = true, colour: number[] = [255, 255, 255]) {
    emit('chat:addMessage', {
        color: colour,
        multiline,
        args: [name ?? GetPlayerName(PlayerId()), message],
    });
}

export function getClientIdFromServerId(playerId: number): number | null {
    const players = GetActivePlayers();

    for (const player of players) {
        const serverId = GetPlayerServerId(player);

        if (serverId === playerId) {
            return player;
        }
    }

    return null;
}

export function getEntityPosition(entity: number): Vector3 {
    return Vector3.fromArray(GetEntityCoords(entity, true));
}

export function setEntityPosition(entity: number, position: Vector3, ragdoll = false, clearArea = false, deadFlag = false, noOffsets = false): void {
    if (noOffsets) {
        SetEntityCoordsNoOffset(entity, position.x, position.y, position.z, true, true, true);
    } else {
        SetEntityCoords(entity, position.x, position.y, position.z, false, deadFlag, ragdoll, clearArea)
    }
}

export function teleportPedWithVehicle(ped: number, position: Vector3, noOffsets = false): void {
    const vehicle = GetVehiclePedIsIn(ped, false);
    let entity = ped;

    // If we're in the driver's seat of a vehicle, teleport the whole vehicle
    if (vehicle && GetPedInVehicleSeat(vehicle, SeatPosition.SF_FrontDriverSide) === ped) {
        entity = vehicle;
    }

    setEntityPosition(entity, position, false, false, false, noOffsets);
}

export async function withModel<T>(model: Model, callback: (model: Model, loaded: boolean) => T, timeoutMs: number = 5000): Promise<T> {
    async function* context(callback: (model: Model, loaded: boolean) => T): AsyncGenerator<T> {
        try {
            const loaded = await loadModel(model, timeoutMs);
            await delay(0);

            if (isPromise(callback)) {
                yield await callback(model, loaded);
            } else {
                yield callback(model, loaded);
            }
        } finally {
            SetModelAsNoLongerNeeded(model);
        }
    }

    return (await context(callback).next()).value;
}

export function getWaypoint(): number | null {
    const blipType = 8;
    const blip = GetFirstBlipInfoId(blipType);
    return blip > 0 ? blip : null;
}

export function getWaypointPosition(): Vector3 | null {
    const waypoint = getWaypoint();

    if (!waypoint) {
        return null;
    }

    const coords = GetBlipCoords(waypoint);
    return Vector3.fromArray(coords);
}

function makeColourWithOffset(offset: number, frequency: number, now: number): number {
    return Math.round(Math.sin((now / 5000) * frequency + offset) * 127 + 128);
}

export function rainbowRgb(frequency: number): Colour {
    const now = GetGameTimer();

    return [
        makeColourWithOffset(0, frequency, now),
        makeColourWithOffset(2, frequency, now),
        makeColourWithOffset(4, frequency, now),
    ];
}

export function invertColour(colour: Colour): Colour {
    const [r, g, b] = colour;
    return [255 - r, 255 - g, 255 - b];
}

export async function teleportToGroundHeight(ped: number, position: Vector3, includeWater = true, additionalHeight = 2.5): Promise<void> {
    const testHeights = [
        100,
        150,
        50,
        0,
        200,
        250,
        300,
        350,
        400,
        450,
        500,
        550,
        600,
        650,
        700,
        750,
        800,
    ];

    for (const height of testHeights) {
        const testPosition = position.withZ(height);
        teleportPedWithVehicle(ped, position, true);

        const [found, ground] = GetGroundZFor_3dCoord(testPosition.x, testPosition.y, testPosition.z, includeWater);

        if (found) {
            teleportPedWithVehicle(ped, position.withZ(ground + additionalHeight));
            return;
        }

        await delay(100);
    }
}

export function getPedVehicleSeat(ped: number): number | null {
    const vehicle = GetVehiclePedIsIn(ped, false);

    if (!vehicle) {
        return null;
    }

    // TODO: Is it faster to use GetEntityModel() and GetVehicleModelNumberOfSeats? Reasonably the model will be loaded in most cases.
    for (let i = 0; i <= 128; i++) {
        const pedInSeat = GetPedInVehicleSeat(vehicle, i);

        if (ped === pedInSeat) {
            return i;
        }
    }

    return null;
}

export function getVehicleMods(vehicle: number): ModList {
    // We divide by 2 because enums compile to have a reverse mapping
    const mods: ModList = new Map();

    for (const key of Object.values(VehicleModType)) {
        if (typeof key === 'string') {
            continue;
        }

        if (GetNumVehicleMods(vehicle, key) < 1) {
            continue;
        }

        mods.set(key, GetVehicleMod(vehicle, key));
    }

    return mods;
}

export async function spawnVehicle(model: Model): Promise<number> {
    const config = getConfig();
    const ped = PlayerPedId();
    const playerVehicle = GetVehiclePedIsUsing(ped);
    let position = Vector3.fromArray(GetEntityCoords(ped, true));

    if (!config.getBool('SpawnInVehicle')) {
        position = position.withOffsets(2.5, 2.5, 1);
    }

    const vehicle = await withModel(model, (model, loaded) => {
        if (!loaded) {
            notify(`~r~Failed to load vehicle model ${model}!`);
            return 0;
        }

        const { x, y, z } = position;
        const playerHeading = GetEntityHeading(ped);

        return CreateVehicle(model, x, y, z, playerHeading, true, false);
    });

    if (!vehicle) {
        notify(`~r~Failed to load vehicle model ${model}!`);
        return 0;
    }

    if (config.getBool('SpawnInVehicle')) {
        SetPedIntoVehicle(ped, vehicle, SeatPosition.SF_FrontDriverSide);

        if (playerVehicle) {
            if (config.getBool('MaintainVehicleVelocityOnSwitch')) {
                SetVehicleEngineOn(vehicle, true, true, false);
                SetVehicleSteeringAngle(vehicle, GetVehicleSteeringAngle(vehicle));
                SetEntityVelocity.apply(null, [vehicle, ...GetEntityVelocity(playerVehicle)]);
                SetVehicleCurrentRpm(vehicle, GetVehicleCurrentRpm(playerVehicle));
                SetEntityHeading(vehicle, GetEntityHeading(playerVehicle));
                SetVehicleHighGear(vehicle, GetVehicleHighGear(playerVehicle));
                SetEntityRotation.apply(null, [vehicle, ...GetEntityRotation(playerVehicle, 0), 0, false]);
            }

            setImmediate(() => {
                transferVehiclePassengers(playerVehicle, vehicle);
                DeleteVehicle(playerVehicle);
            });
        }
    }

    notify(`~g~Spawned vehicle '${GetDisplayNameFromVehicleModel(model)}'.`);
    return vehicle;
}

/**
 * Attempt to move all passengers from one vehicle to another
 *
 * @param from the vehicle to move passengers from
 * @param to the vehicle to move passengers to
 * @returns true if there was enough space to move everybody
 */
export function transferVehiclePassengers(from: number, to: number): boolean {
    const toPassengerCount = GetVehicleNumberOfPassengers(to);
    const toMaxPassengers = GetVehicleMaxNumberOfPassengers(to);
    const fromSeatCount = GetVehicleModelNumberOfSeats(GetEntityModel(from));

    let amountSeated = toPassengerCount;

    // Seats start at -1, for driver
    for (let seat = -1; seat < (fromSeatCount - 1); seat++) {
        const pedInSeat = GetPedInVehicleSeat(from, seat);

        if (pedInSeat) {
            SetPedIntoVehicle(pedInSeat, to, SeatPosition.FirstAvailable);
            amountSeated++;
        }

        // We've run out of space
        if (amountSeated > toMaxPassengers) {
            return false;
        }
    }

    return true;
}

export function getLocalisedName(gxtEntry: string): string {
    return DoesTextLabelExist(gxtEntry) ? GetLabelText(gxtEntry) : '';
}

export async function loadTranslationText(key: string, slot: number, timeout = 1000): Promise<boolean> {
    if (HasThisAdditionalTextLoaded(key, slot)) {
        return true;
    }

    const end = GetGameTimer() + timeout;

    ClearAdditionalText(slot, true);
    RequestAdditionalText(key, slot);

    while (GetGameTimer() < end) {
        if (HasThisAdditionalTextLoaded(key, slot)) {
            return true;
        }

        await delay(0);
    }

    return false;
}

export async function getModTypeName(vehicle: number, modType: VehicleModType): Promise<string> {
    await loadTranslationText('mod_mnu', 10);
    const name = getModTypeNameInternal(vehicle, modType);

    return name ?? ``;
}

function getModTypeNameInternal(vehicle: number, modType: VehicleModType): string {
    const model = GetEntityModel(vehicle);

    switch (modType) {
        case VehicleModType.Armor:
            return getLocalisedName('CMOD_MOD_ARM');
        case VehicleModType.Brakes:
            return getLocalisedName('CMOD_MOD_BRA');
        case VehicleModType.Engine:
            return getLocalisedName('CMOD_MOD_ENG');
        case VehicleModType.Suspension:
            return getLocalisedName('CMOD_MOD_SUS');
        case VehicleModType.Transmission:
            return getLocalisedName('CMOD_MOD_TRN');
        case VehicleModType.Horns:
            return getLocalisedName('CMOD_MOD_HRN');
        case VehicleModType.FrontWheel:
            if (!IsThisModelABike(model) && IsThisModelABicycle(model)) {
                return getLocalisedName('CMOD_MOD_WHEM') ?? 'Wheels';
            }

            return getLocalisedName('CMOD_WHE0_0');
        case VehicleModType.RearWheel:
            return getLocalisedName('CMOD_WHE0_1');

        // Bennys
        case VehicleModType.PlateHolder:
            return getLocalisedName('CMM_MOD_S0');
        case VehicleModType.VanityPlates:
            return getLocalisedName('CMM_MOD_S1');
        case VehicleModType.TrimDesign:
            if (model === VehicleHash.SultanRS) {
                return getLocalisedName('CMM_MOD_S2b');
            }

            return getLocalisedName('CMM_MOD_S2');
        case VehicleModType.Ornaments:
            return getLocalisedName('CMM_MOD_S3');
        case VehicleModType.Dashboard:
            return getLocalisedName('CMM_MOD_S4');
        case VehicleModType.DialDesign:
            return getLocalisedName('CMM_MOD_S5');
        case VehicleModType.DoorSpeakers:
            return getLocalisedName('CMM_MOD_S6');
        case VehicleModType.Seats:
            return getLocalisedName('CMM_MOD_S7');
        case VehicleModType.SteeringWheels:
            return getLocalisedName('CMM_MOD_S8');
        case VehicleModType.ColumnShifterLevers:
            return getLocalisedName('CMM_MOD_S9');
        case VehicleModType.Plaques:
            return getLocalisedName('CMM_MOD_S10');
        case VehicleModType.Speakers:
            return getLocalisedName('CMM_MOD_S11');
        case VehicleModType.Trunk:
            return getLocalisedName('CMM_MOD_S12');
        case VehicleModType.Hydraulics:
            return getLocalisedName('CMM_MOD_S13');
        case VehicleModType.EngineBlock:
            return getLocalisedName('CMM_MOD_S14');
        case VehicleModType.AirFilter:
            if (model === VehicleHash.SultanRS) {
                return getLocalisedName('CMM_MOD_S15b');
            }

            return getLocalisedName('CMM_MOD_S15');
        case VehicleModType.Struts:
            if (model === VehicleHash.SultanRS || model === VehicleHash.Banshee2) {
                return getLocalisedName('CMM_MOD_S16b');
            }

            return getLocalisedName('CMM_MOD_S16');
        case VehicleModType.ArchCover:
            if (model === VehicleHash.SultanRS) {
                return getLocalisedName('CMM_MOD_S17b');
            }

            return getLocalisedName('CMM_MOD_S17');
        case VehicleModType.Aerials:
            if (model === VehicleHash.SultanRS) {
                return getLocalisedName('CMM_MOD_S18b');
            } else if (model === VehicleHash.BType3) {
                return getLocalisedName('CMM_MOD_S18c');
            }

            return getLocalisedName('CMM_MOD_S18');
        case VehicleModType.Trim:
            if (model === VehicleHash.SultanRS) {
                return getLocalisedName('CMM_MOD_S19b');
            } else if (model === VehicleHash.BType3) {
                return getLocalisedName('CMM_MOD_S19c');
            } else if (model === VehicleHash.Virgo2) {
                return getLocalisedName('CMM_MOD_S19d');
            }

            return getLocalisedName('CMM_MOD_S19');
        case VehicleModType.Tank:
            if (model === VehicleHash.SlamVan3) {
                return getLocalisedName('CMM_MOD_S27');
            }

            return getLocalisedName('CMM_MOD_S20');
        case VehicleModType.Windows:
            if (model === VehicleHash.BType3) {
                return getLocalisedName('CMM_MOD_S21b');
            }

            return getLocalisedName('CMM_MOD_S21');
        case 47 as VehicleModType:
            if (model === VehicleHash.SlamVan3) {
                return getLocalisedName('SLVAN3_RDOOR');
            }

            return getLocalisedName('CMM_MOD_S22');
        case VehicleModType.Livery:
            return getLocalisedName('CMM_MOD_S23');
        default:
            const name = GetModSlotName(vehicle, modType);
            return getLocalisedName(name) || addSpacesToCamelCase(VehicleModType[modType]);
    }
}

export function addSpacesToCamelCase(name: string): string {
    return name.replaceAll(/([A-Z|\d+])/g, ' $1').trim();
}
