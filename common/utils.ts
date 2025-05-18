export type Colour = [r: number, g: number, b: number];
export type ModList = Map<VehicleModType, number>;

import getConfig from 'Config';
import {
	OnScreenKeyboardStatus,
	SeatPosition,
	VehicleModType,
	VehicleSeat,
} from 'Data/ParamEnums';
import { VehicleHash } from 'Data/VehicleHash';
import { VehicleHorn, VehicleHornName } from 'Data/VehicleHorns';
import Vector3 from 'Vector3';
import isPromise from 'is-promise';

export type Model = number | string;

export const RUNNING_ON_SERVER = IsDuplicityVersion();
export const RUNNING_ON_CLIENT = !RUNNING_ON_SERVER;

export function notify(
	message: string,
	isImportant = false,
	showOnInfoTab = false,
) {
	SetNotificationTextEntry('STRING');
	AddTextComponentString(message);
	DrawNotification(isImportant, showOnInfoTab);
}

export async function loadModel(
	model: Model,
	timeoutMs = 5000,
	silent = true,
): Promise<boolean> {
	if (!silent) {
		console.log(`Loading model ${model}...`);
	}

	const timeout = Date.now() + timeoutMs;

	RequestModel(model);

	while (!HasModelLoaded(model)) {
		await delay(1);

		if (Date.now() > timeout) {
			console.log(
				`Failed to load model ${model} after ${timeoutMs} milliseconds!`,
			);
			return false;
		}
	}

	if (!silent) {
		console.log(`Loaded model ${model}...`);
	}

	return true;
}

export async function loadAnimDict(
	animation: string,
	timeoutMs = 5000,
): Promise<boolean> {
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
		console.log(
			`Failed to load animation '${animation}' after ${timeoutMs} milliseconds!`,
		);
		return false;
	}

	return true;
}

export function sendUIMessage(message: object) {
	SendNUIMessage(message);
}

export async function getUserInput(
	maxLength: number,
	windowTitle = '',
	defaultText = '',
) {
	showKeyboard(maxLength, windowTitle, defaultText);

	while (UpdateOnscreenKeyboard() === OnScreenKeyboardStatus.OSK_PENDING) {
		await delay(0);
	}

	return GetOnscreenKeyboardResult();
}

export function showKeyboard(
	maxLength: number,
	windowTitle = '',
	defaultText = '',
) {
	DisplayOnscreenKeyboard(
		1,
		windowTitle,
		null,
		defaultText,
		null,
		null,
		null,
		maxLength + 1,
	);
}

export function delay(ms: number): Promise<CitizenTimer> {
	return new Promise((res) => setTimeout(res, ms, null));
}

export function sendChatMessage(
	message: string,
	name: string | null = null,
	multiline = true,
	colour: number[] = [255, 255, 255],
) {
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

export function setEntityPosition(
	entity: number,
	position: Vector3,
	ragdoll = false,
	clearArea = false,
	deadFlag = false,
	noOffsets = false,
): void {
	if (noOffsets) {
		SetEntityCoordsNoOffset(
			entity,
			position.x,
			position.y,
			position.z,
			true,
			true,
			true,
		);
	} else {
		SetEntityCoords(
			entity,
			position.x,
			position.y,
			position.z,
			false,
			deadFlag,
			ragdoll,
			clearArea,
		);
	}
}

export function teleportPedWithVehicle(
	ped: number,
	position: Vector3,
	noOffsets = false,
): void {
	const vehicle = GetVehiclePedIsIn(ped, false);
	let entity = ped;

	// If we're in the driver's seat of a vehicle, teleport the whole vehicle
	if (
		vehicle &&
		GetPedInVehicleSeat(vehicle, SeatPosition.SF_FrontDriverSide) === ped
	) {
		entity = vehicle;
	}

	setEntityPosition(entity, position, false, false, false, noOffsets);
}

export async function withModel<T>(
	model: Model,
	callback: (model: Model, loaded: boolean) => T,
	timeoutMs = 5000,
): Promise<T> {
	async function* context(
		callback: (model: Model, loaded: boolean) => T,
	): AsyncGenerator<T> {
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

function makeColourWithOffset(
	offset: number,
	frequency: number,
	now: number,
): number {
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

export async function getUserInputColour(): Promise<Colour> {
	const input = await getUserInput(
		64,
		'Enter custom colour (HTML #RRGGBB or R,G,B)',
		'',
	);
	return stringToColour(input);
}

export function hexToColour(input: string): Colour {
	let clean = input.trim().replace(/^#/, '').toLowerCase();

	if (clean.length === 3) {
		clean = clean.replaceAll(/(.)/g, '$1$1');
	}

	const match = clean.match(/(?<r>..)(?<g>..)(?<b>..)(?<a>..)?/);

	if (!match) {
		return null;
	}

	const { r, g, b } = match.groups;
	return [r, g, b].map((x) => Number.parseInt(x, 16)) as Colour;
}

export function stringToColour(input: string): Colour {
	if (input.trim().startsWith('#')) {
		return hexToColour(input);
	}

	const split = input.split(',');

	if (split.length !== 3) {
		return;
	}

	return split.map((x) => Number.parseInt(x.trim(), 10)) as Colour;
}

export async function teleportToGroundHeight(
	ped: number,
	position: Vector3,
	includeWater = true,
	additionalHeight = 2.5,
): Promise<void> {
	const testHeights = [
		100, 150, 50, 0, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750,
		800,
	];

	for (const height of testHeights) {
		const testPosition = position.withZ(height);
		teleportPedWithVehicle(ped, position, true);

		const [found, ground] = GetGroundZFor_3dCoord(
			testPosition.x,
			testPosition.y,
			testPosition.z,
			includeWater,
		);

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

export function getVehicleName(vehicle: number): string {
	return getVehicleModelName(GetEntityModel(vehicle));
}

export function getVehicleModelName(model: number): string {
	return translate(GetDisplayNameFromVehicleModel(model));
}

export async function getLiveryName(
	vehicle: number,
	livery: number,
): Promise<string> {
	const modLiveryCount = GetNumVehicleMods(vehicle, VehicleModType.Livery);

	if (modLiveryCount > 0) {
		return await getModName(vehicle, VehicleModType.Livery, livery);
	}

	return translate(GetLiveryName(vehicle, livery));
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

export function deleteVehicle(vehicle: number) {
	SetEntityAsMissionEntity(vehicle, false, true);
	DeleteEntity(vehicle);
	DeleteVehicle(vehicle);
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
		let steeringAngle;
		let velocity;
		let rpm;
		let heading;
		let highGear;
		let rotation;

		if (playerVehicle) {
			steeringAngle = GetVehicleSteeringAngle(vehicle);
			velocity = GetEntityVelocity(playerVehicle);
			rpm = GetVehicleCurrentRpm(playerVehicle);
			heading = GetEntityHeading(playerVehicle);
			highGear = GetVehicleHighGear(playerVehicle);
			rotation = GetEntityRotation(playerVehicle, 0);

			transferVehiclePassengers(playerVehicle, vehicle, true);
			deleteVehicle(playerVehicle);
		}

		SetPedIntoVehicle(ped, vehicle, SeatPosition.SF_FrontDriverSide);

		if (playerVehicle) {
			if (config.getBool('MaintainVehicleVelocityOnSwitch')) {
				SetVehicleEngineOn(vehicle, true, true, false);
				SetVehicleSteeringAngle(vehicle, steeringAngle);
				SetEntityVelocity.apply(null, [vehicle, ...velocity]);
				SetVehicleCurrentRpm(vehicle, rpm);
				SetEntityHeading(vehicle, heading);
				SetVehicleHighGear(vehicle, highGear);
				SetEntityRotation.apply(null, [vehicle, ...rotation, 0, false]);
			}
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
 * @param leaveDriver whether to leave the driver seat empty and not transfer them
 * @returns true if there was enough space to move everybody
 */
export function transferVehiclePassengers(
	from: number,
	to: number,
	leaveDriver = false,
): boolean {
	const toPassengerCount = GetVehicleNumberOfPassengers(to);
	const toMaxPassengers = GetVehicleMaxNumberOfPassengers(to);
	const fromSeatCount = GetVehicleModelNumberOfSeats(GetEntityModel(from));
	const firstSeat = leaveDriver ? VehicleSeat.RightFront : VehicleSeat.Driver;

	let amountSeated = toPassengerCount;

	for (let seat = firstSeat; seat < fromSeatCount - 1; seat++) {
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

export function translate(gxtEntry: string): string {
	return DoesTextLabelExist(gxtEntry) ? GetLabelText(gxtEntry) : '';
}

export async function loadTranslationText(
	key: string,
	slot: number,
	timeout = 1000,
): Promise<boolean> {
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

export async function getModName(
	vehicle: number,
	modType: VehicleModType,
	index: number,
): Promise<string> {
	const modCount = GetNumVehicleMods(vehicle, modType);

	if (!modCount || modCount < -1 || index > modCount) {
		return null;
	}

	const model = GetEntityModel(vehicle);

	await Promise.all([
		loadModel(model, 1000),
		loadTranslationText('mod_mnu', 10),
	]);

	if (modType === VehicleModType.Horns) {
		if (DoesTextLabelExist(VehicleHorn[index])) {
			return translate(VehicleHorn[index]);
		}

		return VehicleHornName[index];
	}

	if ([VehicleModType.FrontWheel, VehicleModType.RearWheel].includes(modType)) {
		if (index === -1) {
			if (!IsThisModelABike(model) && IsThisModelABicycle(model)) {
				return translate('CMOD_WHE_0');
			}
			return translate('CMOD_WHE_B_0');
		}

		const name = GetModTextLabel(vehicle, modType, index);

		if (index >= modCount / 2) {
			return `${translate('CHROME')} ${name}`;
		}

		return name;
	}

	switch (modType) {
		case VehicleModType.Armor:
			return translate(`CMOD_ARM_${index + 1}`);
		case VehicleModType.Brakes:
			return translate(`CMOD_BRA_${index + 1}`);
		case VehicleModType.Engine:
			return index === -1
				? translate('CMOD_ARM_0')
				: translate(`CMOD_ENG_${index + 2}`);
		case VehicleModType.Suspension:
			return translate(`CMOD_SUS_${index + 1}`);
		case VehicleModType.Transmission:
			return translate(`CMOD_GBX_${index + 1}`);
	}

	if (index === -1) {
		switch (modType) {
			case VehicleModType.AirFilter:
				// TODO: NYI - The C# API doesn't do anything for this
				break;
			case VehicleModType.Struts:
				switch (model) {
					case VehicleHash.Banshee:
					case VehicleHash.Banshee2:
					case VehicleHash.SultanRS:
						return translate('CMOD_COL5_41');
				}

				break;
		}

		return translate('CMOD_DEF_0');
	}

	let label = GetModTextLabel(vehicle, modType, index);

	if (DoesTextLabelExist(label)) {
		label = translate(label);

		if (label && label.toLocaleLowerCase() !== 'null') {
			return label;
		}
	}

	return `${await getModTypeName(vehicle, modType)} ${index + 1}`;
}

export async function getModTypeName(
	vehicle: number,
	modType: VehicleModType,
): Promise<string> {
	await loadTranslationText('mod_mnu', 10);
	const name = getModTypeNameInternal(vehicle, modType);

	return name ?? '';
}

function getModTypeNameInternal(
	vehicle: number,
	modType: VehicleModType,
): string {
	const model = GetEntityModel(vehicle);

	switch (modType) {
		case VehicleModType.Armor:
			return translate('CMOD_MOD_ARM');
		case VehicleModType.Brakes:
			return translate('CMOD_MOD_BRA');
		case VehicleModType.Engine:
			return translate('CMOD_MOD_ENG');
		case VehicleModType.Suspension:
			return translate('CMOD_MOD_SUS');
		case VehicleModType.Transmission:
			return translate('CMOD_MOD_TRN');
		case VehicleModType.Horns:
			return translate('CMOD_MOD_HRN');
		case VehicleModType.FrontWheel:
			if (!IsThisModelABike(model) && IsThisModelABicycle(model)) {
				return translate('CMOD_MOD_WHEM') ?? 'Wheels';
			}

			return translate('CMOD_WHE0_0');
		case VehicleModType.RearWheel:
			return translate('CMOD_WHE0_1');

		// Bennys
		case VehicleModType.PlateHolder:
			return translate('CMM_MOD_S0');
		case VehicleModType.VanityPlates:
			return translate('CMM_MOD_S1');
		case VehicleModType.TrimDesign:
			if (model === VehicleHash.SultanRS) {
				return translate('CMM_MOD_S2b');
			}

			return translate('CMM_MOD_S2');
		case VehicleModType.Ornaments:
			return translate('CMM_MOD_S3');
		case VehicleModType.Dashboard:
			return translate('CMM_MOD_S4');
		case VehicleModType.DialDesign:
			return translate('CMM_MOD_S5');
		case VehicleModType.DoorSpeakers:
			return translate('CMM_MOD_S6');
		case VehicleModType.Seats:
			return translate('CMM_MOD_S7');
		case VehicleModType.SteeringWheels:
			return translate('CMM_MOD_S8');
		case VehicleModType.ColumnShifterLevers:
			return translate('CMM_MOD_S9');
		case VehicleModType.Plaques:
			return translate('CMM_MOD_S10');
		case VehicleModType.Speakers:
			return translate('CMM_MOD_S11');
		case VehicleModType.Trunk:
			return translate('CMM_MOD_S12');
		case VehicleModType.Hydraulics:
			return translate('CMM_MOD_S13');
		case VehicleModType.EngineBlock:
			return translate('CMM_MOD_S14');
		case VehicleModType.AirFilter:
			if (model === VehicleHash.SultanRS) {
				return translate('CMM_MOD_S15b');
			}

			return translate('CMM_MOD_S15');
		case VehicleModType.Struts:
			if (model === VehicleHash.SultanRS || model === VehicleHash.Banshee2) {
				return translate('CMM_MOD_S16b');
			}

			return translate('CMM_MOD_S16');
		case VehicleModType.ArchCover:
			if (model === VehicleHash.SultanRS) {
				return translate('CMM_MOD_S17b');
			}

			return translate('CMM_MOD_S17');
		case VehicleModType.Aerials:
			if (model === VehicleHash.SultanRS) {
				return translate('CMM_MOD_S18b');
			}
			if (model === VehicleHash.BType3) {
				return translate('CMM_MOD_S18c');
			}

			return translate('CMM_MOD_S18');
		case VehicleModType.Trim:
			if (model === VehicleHash.SultanRS) {
				return translate('CMM_MOD_S19b');
			}
			if (model === VehicleHash.BType3) {
				return translate('CMM_MOD_S19c');
			}
			if (model === VehicleHash.Virgo2) {
				return translate('CMM_MOD_S19d');
			}

			return translate('CMM_MOD_S19');
		case VehicleModType.Tank:
			if (model === VehicleHash.SlamVan3) {
				return translate('CMM_MOD_S27');
			}

			return translate('CMM_MOD_S20');
		case VehicleModType.Windows:
			if (model === VehicleHash.BType3) {
				return translate('CMM_MOD_S21b');
			}

			return translate('CMM_MOD_S21');
		case 47 as VehicleModType:
			if (model === VehicleHash.SlamVan3) {
				return translate('SLVAN3_RDOOR');
			}

			return translate('CMM_MOD_S22');
		case VehicleModType.Livery:
			return translate('CMM_MOD_S23');
		default: {
			const name = GetModSlotName(vehicle, modType);
			return translate(name) || addSpacesToCamelCase(VehicleModType[modType]);
		}
	}
}

export function addSpacesToCamelCase(name: string): string {
	return name.replaceAll(/([A-Z|\d+])/g, ' $1').trim();
}

export function cleanColourName(name: string) {
	return addSpacesToCamelCase(
		name.replaceAll('Util', 'Utility').replaceAll('Metallic', ''),
	);
}
