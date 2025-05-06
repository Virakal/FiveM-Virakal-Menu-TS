import isPromise from "is-promise";
import Vector3 from "Vector3";

export type Model = number | string;

export const RUNNING_ON_SERVER = IsDuplicityVersion();
export const RUNNING_ON_CLIENT = !RUNNING_ON_SERVER;

export function notify(message: string, isImportant = false, showOnInfoTab = false) {
    SetNotificationTextEntry('STRING');
    AddTextComponentString(message);
    DrawNotification(isImportant, showOnInfoTab);
}

export async function loadModel(model: Model, timeoutMs = 5000): Promise<boolean> {
    console.log(`Loading model ${model}...`);

    const timeout = Date.now() + timeoutMs;

    RequestModel(model);

    while (!HasModelLoaded(model)) {
        await delay(1);

        if (Date.now() > timeout) {
            console.log(`Failed to load model ${model} after ${timeoutMs} milliseconds!`);
            return false;
        }
    }

    console.log(`Loaded model ${model}...`);

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
    if (vehicle && GetPedInVehicleSeat(vehicle, -1) === ped) {
        entity = vehicle;
    }

    setEntityPosition(entity, position, false, false, false, noOffsets);
}

export async function withModel(model: Model, callback: (model: Model, loaded: boolean) => any, timeoutMs: number = 5000) {
    async function* context(callback: (model: Model, loaded: boolean) => any): AsyncGenerator<CitizenImmediate> {
        try {
            const loaded = await loadModel(model, timeoutMs);

            if (isPromise(callback)) {
                yield setImmediate(async () => await callback(model, loaded));
            } else {
                yield setImmediate(() => callback(model, loaded));
            }
        } finally {
            SetModelAsNoLongerNeeded(model);
        }
    }

    return await context(callback).next();
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
