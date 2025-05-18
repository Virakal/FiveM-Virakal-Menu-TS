import getConfig from "@common/Config";
import { VehicleModType, VehicleNeonLight, VehicleToggleModType } from "@common/Data/ParamEnums";
import { addSpacesToCamelCase, delay, getModName, getModTypeName, getVehicleModelName, getVehicleMods, ModList, spawnVehicle } from "@common/utils";

export const GARAGE_CONFIG_KEY_PREFIX = 'VehicleSlot';
export const GARAGE_MAX_VEHICLE_SLOTS = 30;
const SEPARATOR = '<||>';
const SERIAL_VERSION = 2;

export interface GarageSlotInfo {
    model: number,
    modString: string,
    displayName: string,
}

class Garage {
    hasSavedVehicle(slot: string): boolean {
        const config = getConfig();
        return config.has(this.getGarageSlotName(slot));
    }

    getGarageSlotName(slot: string): string {
        return `${GARAGE_CONFIG_KEY_PREFIX}${slot}`;
    }

    saveVehicle(slot: string, vehicle: number): void {
        const config = getConfig();
        const configKey = this.getGarageSlotName(slot);
        const mods = getVehicleMods(vehicle);
        const modString = this.toModString(vehicle, mods);
        const model = GetEntityModel(vehicle);
        const modelName = getVehicleModelName(model);
        const serialised = [
            `v${SERIAL_VERSION}`,
            model.toString(),
            modelName,
            modString,
        ].join(SEPARATOR);

        config.set(configKey, serialised);

        console.log(`Saved vehicle ${modelName} to ${configKey}`);
    }

    getVehicleInfo(slot: string): GarageSlotInfo {
        const config = getConfig();
        const configKey = this.getGarageSlotName(slot);
        const data = config.get(configKey);

        return this.deserialiseVehicleInfo(data);
    }

    async loadVehicle(slot: string): Promise<number> {
        const configKey = this.getGarageSlotName(slot);
        const info = this.getVehicleInfo(slot);
        const vehicle = await spawnVehicle(info.model);

        await this.applyModString(vehicle, info.modString);
        console.log(`Loaded from ${configKey}. Name: ${info.displayName} Model: ${info.model}`);

        return vehicle;
    }

    private deserialiseVehicleInfo(text: string): GarageSlotInfo {
        const split = text.split(SEPARATOR);
        let version = 1;

        if (split[0].match(/^v\d+$/i)) {
            version = Number.parseInt(split[0].slice(1));
        }

        switch (version) {
            case 1:
                return {
                    model: Number.parseInt(split[0]),
                    displayName: 'Unknown',
                    modString: split[1],
                };
            case 2:
                return {
                    model: Number.parseInt(split[1]),
                    displayName: split[2],
                    modString: split[3],
                };
            default:
                throw new SyntaxError('Failed to deserialise garage vehicle - could not determine the version.');
        }
    }

    toModString(vehicle: number, mods: ModList): string {
        let modList: { [key: string]: string; } = {};

        if (GetIsVehiclePrimaryColourCustom(vehicle)) {
            modList.CustomPrimary = GetVehicleCustomPrimaryColour(vehicle).join(',');
        } else {
            modList.PrimaryColour = GetVehicleColours(vehicle)[0].toString();
        }

        if (GetIsVehicleSecondaryColourCustom(vehicle)) {
            modList.CustomSecondary = GetVehicleCustomSecondaryColour(vehicle).join(',');
        } else {
            modList.SecondaryColour = GetVehicleColours(vehicle)[1].toString();
        }

        modList = {...modList, ...{
            PearlescentColour: GetVehicleExtraColours(vehicle)[0].toString(),
            Livery: GetVehicleLivery(vehicle).toString(),
            PlateText: GetVehicleNumberPlateText(vehicle),
            PlateStyle: GetVehicleNumberPlateTextIndex(vehicle).toString(),
            RimColour: GetVehicleExtraColours(vehicle)[1].toString(),
            WindowTint: GetVehicleWindowTint(vehicle).toString(),
            DashboardColour: GetVehicleDashboardColour(vehicle).toString(),
            NeonColour: GetVehicleNeonLightsColour(vehicle).join(','),
            TyreSmokeColour: GetVehicleTyreSmokeColor(vehicle).join(','),
            TrimColour: GetVehicleInteriorColour(vehicle, null).toString(),
            ColourCombo: GetVehicleColourCombination(vehicle).toString(),
            WheelType: GetVehicleWheelType(vehicle).toString(),
        }};

        for (const [key, value] of Object.entries(VehicleToggleModType)) {
            // Enums compile to a two-way lookup table, so ignore the number keys
            if (!isNaN(Number.parseInt(key, 10))) {
                continue;
            }

            modList[key] = IsToggleModOn(vehicle, value as number) ? 'true' : 'false';
        }

        for (const value of Object.values(VehicleNeonLight)) {
            // Enums compile to a two-way lookup table, so ignore the number keys
            if (typeof value === 'string') {
                continue;
            }

            modList[`NeonEnabled${value}`] = IsVehicleNeonLightEnabled(vehicle, value as number) ? 'true' : 'false';
        }

        for (const modType of Object.values(VehicleModType)) {
            // Enums compile to a two-way lookup table, so ignore the number keys
            if (typeof modType === 'string') {
                continue;
            }

            if (GetNumVehicleMods(vehicle, modType) > 0) {
                modList[`Mod#${modType}`] = GetVehicleMod(vehicle, modType).toString();
            }
        }

        return JSON.stringify(modList);
    }

    private async applyModString(vehicle: number, modString: string) {
        const modList: Record<string, string> = JSON.parse(modString);

        if ('ColourCombo' in modList) {
            console.log(`Setting colour combination to ${modList.ColourCombo}`);
            SetVehicleColourCombination(vehicle, Number.parseInt(modList.ColourCombo));
        }

        if ('CustomPrimary' in modList) {
            console.log(`Setting primary colour to ${modList.CustomPrimary}`);
            const colour = modList.CustomPrimary.split(',').map((x) => Number.parseInt(x.trim()));
            SetVehicleCustomPrimaryColour.apply(null, [vehicle, ...colour]);
        }

        if ('CustomSecondary' in modList) {
            console.log(`Setting secondary colour to ${modList.CustomSecondary}`);
            const colour = modList.CustomSecondary.split(',').map((x) => Number.parseInt(x.trim()));
            SetVehicleCustomSecondaryColour.apply(null, [vehicle, ...colour]);
        }

        if ('PrimaryColour' in modList) {
            console.log(`Setting primary colour to ${modList.PrimaryColour}`);
            SetVehicleColours(vehicle, Number.parseInt(modList.PrimaryColour), GetVehicleColours(vehicle)[1]);
        }

        if ('SecondaryColour' in modList) {
            console.log(`Setting secondary colour to ${modList.SecondaryColour}`);
            SetVehicleColours(vehicle, GetVehicleColours(vehicle)[0], Number.parseInt(modList.SecondaryColour));
        }

        if ('PearlescentColour' in modList) {
            console.log(`Setting pearlescent colour to ${modList.PearlescentColour}`);
            SetVehicleExtraColours(vehicle, Number.parseInt(modList.PearlescentColour), GetVehicleExtraColours(vehicle)[1]);
        }

        if ('Livery' in modList) {
            console.log(`Setting livery to ${modList.Livery}`);
            SetVehicleLivery(vehicle, Number.parseInt(modList.Livery));
        }

        if ('PlateText' in modList) {
            console.log(`Setting plate text to ${modList.PlateText}`);
            SetVehicleNumberPlateText(vehicle, modList.PlateText);
        }

        if ('PlateStyle' in modList) {
            console.log(`Setting plate style to ${modList.PlateStyle}`);
            SetVehicleNumberPlateTextIndex(vehicle, Number.parseInt(modList.PlateStyle));
        }

        if ('RimColour' in modList) {
            console.log(`Setting rim colour to ${modList.RimColour}`);
            SetVehicleExtraColours(vehicle, GetVehicleExtraColours(vehicle)[0], Number.parseInt(modList.RimColour));
        }

        if ('TrimColour' in modList) {
            console.log(`Setting trim colour to ${modList.TrimColour}`);
            SetVehicleInteriorColour(vehicle, Number.parseInt(modList.TrimColour));
        }

        if ('WheelType' in modList) {
            console.log(`Setting wheel type to ${modList.WheelType}`);
            SetVehicleWheelType(vehicle, Number.parseInt(modList.WheelType));
        }

        SetVehicleModKit(vehicle, 0);
        await delay(0);

        if ('WindowTint' in modList) {
            console.log(`Setting window tint to ${modList.WindowTint}`);
            SetVehicleWindowTint(vehicle, Number.parseInt(modList.WindowTint));
        }

        if ('DashboardColour' in modList) {
            console.log(`Setting dashboard colour to ${modList.DashboardColour}`);
            SetVehicleDashboardColour(vehicle, Number.parseInt(modList.DashboardColour));
        }

        if ('NeonColour' in modList) {
            console.log(`Setting neon colour to ${modList.NeonColour}`);
            const colour = modList.NeonColour.split(',').map((x) => Number.parseInt(x.trim()));
            SetVehicleNeonLightsColour.apply(null, [vehicle, ...colour]);
        }

        if ('TyreSmokeColour' in modList) {
            console.log(`Setting secondary colour to ${modList.TyreSmokeColour}`);
            const colour = modList.TyreSmokeColour.split(',').map((x) => Number.parseInt(x.trim()));
            SetVehicleTyreSmokeColor.apply(null, [vehicle, ...colour]);
        }

        for (let i = 0; i < 4; i++) {
            const key = `NeonEnabled${i}`;

            if (key in modList) {
                console.log(`Setting neon ${i} to ${modList[key]}`);
                SetVehicleNeonLightEnabled(vehicle, i, modList[key] === 'true');
            } else {
                console.log(`Disabling neon ${i} because it isn't set`);
                SetVehicleNeonLightEnabled(vehicle, i, false);
            }
        }

        for (const [key, value] of Object.entries(VehicleToggleModType)) {
            // Enums compile to a two-way lookup table, so ignore the number keys
            if (!isNaN(Number.parseInt(key, 10))) {
                continue;
            }

            console.log(`Setting ${key} to ${value}`);
            ToggleVehicleMod(vehicle, value as number, value === 'true');
        }

        const modPrefix = 'Mod#';

        for (const [key, value] of Object.entries(modList)) {
            if (!key.startsWith(modPrefix)) {
                continue;
            }

            const modType = Number.parseInt(key.replace(modPrefix, ''));
            const index = Number.parseInt(value);

            console.log(`Setting mod ${modType} (${addSpacesToCamelCase(VehicleModType[modType])}) (${await getModTypeName(vehicle, modType)}) to ${value} (${await getModName(vehicle, modType, index)})`);
            SetVehicleMod(vehicle, modType, index, GetVehicleModVariation(modType, index));
        }
    }
}

let instance: Garage;

export function getGarage(): Garage {
    if (!instance) {
        instance = new Garage();
    }

    return instance;
}

export default getGarage;
