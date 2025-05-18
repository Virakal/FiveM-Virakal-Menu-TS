import getConfig from "@common/Config";
import { Control } from "@common/Data/Controls";
import { SeatPosition, VehicleColor, VehicleModType, WindowTitle } from "@common/Data/ParamEnums";
import { delay, getUserInput, invertColour, notify, rainbowRgb, spawnVehicle, stringToColour, translate } from "@common/utils";
import getGarage from "Garage";
import type Trainer from "Trainer";

const RAINBOW_TICK_DELAY = 100;

export default class VehicleHandler implements Handler {
    private trainer;
    rainbowSpeed = 0.5;

    constructor(trainer: Trainer) {
        const config = getConfig();

        this.trainer = trainer;

        config.setDefaults({
            AutoDespawnVehicle: true,
            BoostOnHorn: true,
            BoostPower: '75',
            InvincibleVehicle: true,
            MaintainVehicleVelocityOnSwitch: true,
            RainbowChrome: false,
            RainbowNeon: false,
            RainbowNeonInverse: false,
            RainbowPaint: false,
            RainbowSpeed: '0.5',
            SpawnInVehicle: true,
        });

        // General
        RegisterNuiCallback('veh', this.onVeh.bind(this));
        RegisterNuiCallback('vehspawn', this.onVehSpawn.bind(this));
        // RegisterNuiCallback('vehsearch', this.onVehSearch.bind(this));
        RegisterNuiCallback('vehseat', this.onVehSeat.bind(this));

        // Garage
        RegisterNuiCallback('vehsave', this.onVehSave.bind(this));
        RegisterNuiCallback('vehload', this.onVehLoad.bind(this));

        // Colours
        RegisterNuiCallback('vehprimary', this.onVehPrimary.bind(this));
        RegisterNuiCallback('vehsecondary', this.onVehSecondary.bind(this));
        RegisterNuiCallback('vehboth', this.onVehBoth.bind(this));
        RegisterNuiCallback('vehpearl', this.onVehPearl.bind(this));
        // RegisterNuiCallback('vehcustomboth', this.onVehCustomBoth.bind(this));
        // RegisterNuiCallback('vehcustomprimary', this.onVehCustomPrimary.bind(this));
        // RegisterNuiCallback('vehcustomsecondary', this.onVehCustomSecondary.bind(this));
        // RegisterNuiCallback('vehlivery', this.onVehLivery.bind(this));
        // RegisterNuiCallback('vehrooflivery', this.onVehRoofLivery.bind(this));
        RegisterNuiCallback('vehrim', this.onVehRim.bind(this));
        RegisterNuiCallback('vehdashcolour', this.onVehDashColour.bind(this));
        RegisterNuiCallback('vehtrimcolour', this.onVehTrimColour.bind(this));
        // RegisterNuiCallback('vehtint', this.onVehTint.bind(this));
        // RegisterNuiCallback('vehcolourcombo', this.onVehColourCombo.bind(this));
        RegisterNuiCallback('rainbowspeed', this.onRainbowSpeed.bind(this));
        // RegisterNuiCallback('vehplatetext', this.onVehPlateText.bind(this));
        // RegisterNuiCallback('vehplatestyle', this.onVehPlateStyle.bind(this));
        RegisterNuiCallback('vehneon', this.onVehNeon.bind(this));
        // RegisterNuiCallback('vehtyresmokecolour', this.onVehTyreSmokeColour.bind(this));
        RegisterNuiCallback('vehmod', this.onVehMod.bind(this));
        RegisterNuiCallback('vehmodother', this.onVehModOther.bind(this));

        // Boost
        RegisterNuiCallback('boostpower', this.onBoostPower.bind(this));

        on('virakalMenu:enteredVehicle', this.onNewVehicle.bind(this));

        setTick(this.rainbowTick.bind(this));
        setTick(this.boostTick.bind(this));
        setTick(this.invincibleCarTick.bind(this));

        if (config.has('RainbowSpeed')) {
            this.rainbowSpeed = Number.parseFloat(config.get('RainbowSpeed')) ?? 0.5;
        }
    }

    onVeh(data: NuiData, cb: NuiCallback): NuiCallback {
        const config = getConfig();
        const { action, newstate: state } = data;
        const ped = PlayerPedId();
        const vehicle = GetVehiclePedIsUsing(ped);
        const noVehicleMessage = '~r~Not in a vehicle!';

        switch (action) {
            case 'fix':
                if (!vehicle) {
                    notify(noVehicleMessage);
                    break;
                }

                SetVehicleFixed(vehicle);
                SetEntityHealth(vehicle, 1000);
                notify('~g~Vehicle repaired.');
                break;
            case 'clean':
                if (!vehicle) {
                    notify(noVehicleMessage);
                    break;
                }

                SetVehicleDirtLevel(vehicle, 0);
                notify('~g~Vehicle cleaned.');
                break;
            case 'flip':
                if (!vehicle) {
                    notify(noVehicleMessage);
                    break;
                }

                const success = SetVehicleOnGroundProperly(vehicle);

                if (success) {
                    notify('~g~Vehicle placed on ground.');
                } else {
                    notify('~r~Couldn\'t place the vehicle on the ground.');
                }

                break;
            case 'boosthorn':
                config.set('BoostOnHorn', state);

                if (state) {
                    notify('~g~Boost on horn enabled.');
                } else {
                    notify('~g~Boost on horn disabled.');
                }

                break;
            case 'rainbowcar':
                config.set('RainbowPaint', state);

                if (state) {
                    notify('~g~Rainbow paint enabled.');
                } else {
                    notify('~g~Rainbow paint disabled.');
                }

                break;
            case 'rainbowchrome':
                config.set('RainbowChrome', state);

                if (state) {
                    notify('~g~Rainbow chrome enabled.');
                } else {
                    notify('~g~Rainbow chrome disabled.');
                }

                break;
            case 'rainbowneon':
                config.set('RainbowNeon', state);

                if (state) {
                    notify('~g~Rainbow neon enabled.');
                } else {
                    notify('~g~Rainbow neon disabled.');
                }

                break;
            case 'rainbowneoninverse':
                config.set('RainbowNeonInverse', state);

                if (state) {
                    notify('~g~Rainbow neon (inverse colours) enabled.');
                } else {
                    notify('~g~Rainbow neon (inverse colours) disabled.');
                }

                break;
            case 'invincible':
                config.set('InvincibleVehicle', state);

                if (state) {
                    notify('~g~Invincible vehicle enabled.');
                } else {
                    notify('~g~Invincible vehicle disabled.');
                }

                break;
        }

        cb('ok');
        return cb;
    }

    onVehSeat(data: NuiData, cb: NuiCallback): NuiCallback {
        const { action } = data;
        const ped = PlayerPedId();
        const vehicle = GetVehiclePedIsUsing(ped);

        if (vehicle) {
            SetPedIntoVehicle(ped, vehicle, Number.parseInt(action));
        } else {
            notify('~r~Not in a vehicle!');
        }

        cb('ok');
        return cb;
    }

    async onVehSave(data: NuiData, cb: NuiCallback): Promise<NuiCallback> {
        const { action: slot } = data;
        const garage = getGarage();
        const vehicle = GetVehiclePedIsUsing(PlayerPedId());

        if (vehicle) {
            const model = GetEntityModel(vehicle);
            const name = translate(GetDisplayNameFromVehicleModel(model));
            garage.saveVehicle(slot, vehicle);
            notify(`~g~Save ${name} to slot ${slot}!`);
        } else {
            notify('~r~Not in a vehicle!');
        }

        cb('ok');
        return cb;
    }

    async onVehLoad(data: NuiData, cb: NuiCallback): Promise<NuiCallback> {
        const { action: slot } = data;
        const garage = getGarage();

        cb('ok');

        if (garage.hasSavedVehicle(slot)) {
            await garage.loadVehicle(slot);
        } else {
            notify(`~r~No vehicle saved in slot ${slot}!`)
        }

        return cb;
    }

    onVehPrimary(data: NuiData, cb: NuiCallback): NuiCallback {
        const { action: colour } = data;
        const vehicle = GetVehiclePedIsUsing(PlayerPedId());

        if (vehicle) {
            ClearVehicleCustomPrimaryColour(vehicle);
            SetVehicleColours(vehicle, Number.parseInt(colour), GetVehicleColours(vehicle)[1]);
        } else {
            notify('~r~Not in a vehicle!');
        }

        cb('ok');
        return cb;
    }

    onVehSecondary(data: NuiData, cb: NuiCallback): NuiCallback {
        const { action: colour } = data;
        const vehicle = GetVehiclePedIsUsing(PlayerPedId());

        if (vehicle) {
            ClearVehicleCustomSecondaryColour(vehicle);
            SetVehicleColours(vehicle, GetVehicleColours(vehicle)[0], Number.parseInt(colour));
        } else {
            notify('~r~Not in a vehicle!');
        }

        cb('ok');
        return cb;
    }

    onVehBoth(data: NuiData, cb: NuiCallback): NuiCallback {
        const { action: colour } = data;
        const vehicle = GetVehiclePedIsUsing(PlayerPedId());

        if (vehicle) {
            ClearVehicleCustomPrimaryColour(vehicle);
            ClearVehicleCustomSecondaryColour(vehicle);
            SetVehicleColours(vehicle, Number.parseInt(colour), Number.parseInt(colour));
        } else {
            notify('~r~Not in a vehicle!');
        }

        cb('ok');
        return cb;
    }

    onVehPearl(data: NuiData, cb: NuiCallback): NuiCallback {
        const { action: colour } = data;
        const vehicle = GetVehiclePedIsUsing(PlayerPedId());

        if (vehicle) {
            SetVehicleExtraColours(vehicle, Number.parseInt(colour), GetVehicleExtraColours(vehicle)[1]);
        } else {
            notify('~r~Not in a vehicle!');
        }

        cb('ok');
        return cb;
    }

    onVehRim(data: NuiData, cb: NuiCallback): NuiCallback {
        const { action: colour } = data;
        const vehicle = GetVehiclePedIsUsing(PlayerPedId());

        if (vehicle) {
            SetVehicleExtraColours(vehicle, GetVehicleExtraColours(vehicle)[0], Number.parseInt(colour));
        } else {
            notify('~r~Not in a vehicle!');
        }

        cb('ok');
        return cb;
    }

    onVehDashColour(data: NuiData, cb: NuiCallback): NuiCallback {
        const { action: colour } = data;
        const vehicle = GetVehiclePedIsUsing(PlayerPedId());

        if (vehicle) {
            SetVehicleModKit(vehicle, 0);
            GetVehicleDashboardColour(vehicle, Number.parseInt(colour));
        } else {
            notify('~r~Not in a vehicle!');
        }

        cb('ok');
        return cb;
    }

    onVehTrimColour(data: NuiData, cb: NuiCallback): NuiCallback {
        const { action: colour } = data;
        const vehicle = GetVehiclePedIsUsing(PlayerPedId());

        if (vehicle) {
            SetVehicleModKit(vehicle, 0);
            SetVehicleInteriorColour(vehicle, Number.parseInt(colour));
        } else {
            notify('~r~Not in a vehicle!');
        }

        cb('ok');
        return cb;
    }

    async onVehSpawn(data: NuiData, cb: NuiCallback): Promise<NuiCallback> {
        const { action, newstate: state } = data;
        const config = getConfig();

        cb('ok');

        switch (action) {
            case 'despawn':
                config.set('AutoDespawnVehicle', state);
                break;
            case 'spawninveh':
                config.set('SpawnInVehicle', state);
                break;
            case 'input':
                this.spawnUserInputVehicle();
                break;
            default:
                spawnVehicle(action);
                break;
        }

        return cb;
    }

    onRainbowSpeed(data: NuiData, cb: NuiCallback): NuiCallback {
        const config = getConfig();
        const speed = Number.parseFloat(data.action);

        if (speed > 0) {
            this.rainbowSpeed = speed;
            config.set('RainbowSpeed', speed.toString());
            notify(`~g~Set rainbow speed to ${speed * 100}`);
        } else {
            this.rainbowSpeed = 0.5;
            notify(`~r~Error setting rainbow speed! Set to ${this.rainbowSpeed * 100}`);
        }

        cb('ok');
        return cb;
    }

    onVehNeon(data: NuiData, cb: NuiCallback): NuiCallback {
        const vehicle = GetVehiclePedIsUsing(PlayerPedId());
        const { action } = data;

        cb('ok');

        if (!vehicle) {
            notify('~r~Not in a vehicle!');
            return cb;
        }

        if (action === 'allon') {
            for (let i = 0; i < 4; i++) {
                SetVehicleNeonLightEnabled(vehicle, i, true);
            }

            notify('~g~Neons on.');
        } else if (action === 'alloff') {
            for (let i = 0; i < 4; i++) {
                SetVehicleNeonLightEnabled(vehicle, i, false);
            }

            notify('~g~Neons off.');
        } else {
            const match = action.match(/(?:^(?<set>on|off)(?<light>\d)$|(?<colour>^\d+,\d+,\d+$))/);

            if (match.groups?.set) {
                const { set, light } = match.groups;
                const enable = set === 'on';
                const messagePrefix = enable ? 'Enabled ' : 'Disabled';
                SetVehicleNeonLightEnabled(vehicle, Number.parseInt(light), enable);
                notify(`~g~${messagePrefix} neon ${light}.`);
            } else if (match.groups?.colour) {
                const colour = stringToColour(match.groups.colour);
                SetVehicleNeonLightsColour.apply(null, [vehicle, ...colour]);
            } else {
                notify('~r~Invalid neon instruction!');
            }
        }
    }

    onVehMod(data: NuiData, cb: NuiCallback): NuiCallback {
        const vehicle = GetVehiclePedIsUsing(PlayerPedId());
        cb('ok');

        if (!vehicle) {
            notify('~r~Not in a vehicle!');
            return cb;
        }

        const { action } = data;

        switch (action) {
            case 'quickupgrade':
                SetVehicleModKit(vehicle, 0);
                ToggleVehicleMod(vehicle, VehicleModType.Turbo, true);
                ToggleVehicleMod(vehicle, VehicleModType.XenonLights, true);
                ToggleVehicleMod(vehicle, VehicleModType.TyreSmoke, true);
                SetVehicleMod(vehicle, VehicleModType.Suspension, 3, false);
                SetVehicleMod(vehicle, VehicleModType.Armor, 4, false);
                SetVehicleMod(vehicle, VehicleModType.Brakes, 2, false);
                SetVehicleMod(vehicle, VehicleModType.Engine, 2, false);
                SetVehicleTyreSmokeColor(vehicle, 0, 0, 0);

                notify('~g~Quick upgrade complete!');
                break;
            case 'turboon':
                ToggleVehicleMod(vehicle, VehicleModType.Turbo, true);
                notify('~g~Turbo installed!');
                break;
            case 'turbooff':
                ToggleVehicleMod(vehicle, VehicleModType.Turbo, false);
                notify('~g~Turbo uninstalled!');
                break;
            case 'xenonon':
                ToggleVehicleMod(vehicle, VehicleModType.XenonLights, true);
                notify('~g~Xenon lights installed!');
                break;
            case 'xenonoff':
                ToggleVehicleMod(vehicle, VehicleModType.XenonLights, false);
                notify('~g~Xenon lights uninstalled!');
                break;
            case 'tyresmokeon':
                ToggleVehicleMod(vehicle, VehicleModType.TyreSmoke, true);
                notify('~g~Tyre smoke installed!');
                break;
            case 'tyresmokeoff':
                ToggleVehicleMod(vehicle, VehicleModType.TyreSmoke, false);
                notify('~g~Tyre smoke uninstalled!');
                break;
        }

        emit('virakalMenu:vehicleModsChanged', -1, -1);

        return cb;
    }

    onVehModOther(data: NuiData, cb: NuiCallback): NuiCallback {
        const vehicle = GetVehiclePedIsUsing(PlayerPedId());

        if (vehicle) {
            const { action } = data;
            const [modType, index] = action.split('=').map((i) => Number.parseInt(i, 10));

            // You have to call this before setting a mod for some reason
            SetVehicleModKit(vehicle, 0);
            SetVehicleMod(vehicle, modType, index, GetVehicleModVariation(modType, index));

            emit('virakalMenu:vehicleModsChanged', modType, index);
        }

        cb('ok');
        return cb;
    }

    onBoostPower(data: NuiData, cb: NuiCallback): NuiCallback {
        const config = getConfig();
        const power = data.action;

        config.set('BoostPower', power);
        notify(`~g~Set boost power to ${power}`);

        cb('ok');
        return cb;
    }

    async rainbowTick(): Promise<void> {
        await delay(RAINBOW_TICK_DELAY);

        const config = getConfig();
        const ped = PlayerPedId();
        const vehicle = GetVehiclePedIsUsing(ped);

        if (!vehicle || GetPedInVehicleSeat(vehicle, SeatPosition.SF_FrontDriverSide) !== ped) {
            return;
        }

        const rgb = rainbowRgb(this.rainbowSpeed);
        const [r, g, b] = rgb;

        if (config.getBool('RainbowPaint') || config.getBool('RainbowChrome')) {
            SetVehicleCustomPrimaryColour(vehicle, r, g, b);
            SetVehicleCustomSecondaryColour(vehicle, r, g, b);
        }

        if (config.getBool('RainbowNeonInverse')) {
            const [ir, ig, ib] = invertColour(rgb)
            SetVehicleNeonLightsColour(vehicle, ir, ig, ib);
        } else if (config.getBool('RainbowNeon')) {
            SetVehicleNeonLightsColour(vehicle, r, g, b);
        }
    }

    async boostTick(): Promise<void> {
        const config = getConfig();

        if (config.getBool('BoostOnHorn')) {
            const vehicle = GetVehiclePedIsUsing(PlayerPedId());

            if (vehicle) {
                if (IsControlPressed(1, Control.VehicleHorn)) {
                    let power = Number.parseFloat(config.get('BoostPower'));

                    if (isNaN(power)) {
                        console.log('Failed to parse boost power config variable.');
                        power = 75;
                    }

                    if (IsControlPressed(1, Control.VehicleAccelerate)) {
                        SetVehicleBoostActive(vehicle, true);
                        SetVehicleForwardSpeed(vehicle, power);
                    } else if (IsControlPressed(1, Control.VehicleBrake)) {
                        SetVehicleBoostActive(vehicle, true);
                        SetVehicleForwardSpeed(vehicle, -1 * power);
                    }
                }
            }
        }

        await delay(0);
    }

    async invincibleCarTick(): Promise<void> {
        // TODO: We maybe don't have to do this every tick?
        await delay(0);

        const vehicle = GetVehiclePedIsUsing(PlayerPedId());

        if (vehicle) {
            const invincible = getConfig().getBool('InvincibleVehicle');

            SetVehicleCanBeVisiblyDamaged(vehicle, !invincible);
            SetVehicleTyresCanBurst(vehicle, !invincible);
            SetVehicleWheelsCanBreak(vehicle, !invincible);
            SetEntityInvincible(vehicle, invincible);
            SetEntityProofs(vehicle, invincible, invincible, invincible, invincible, invincible, invincible, true, invincible);
            SetEntityCanBeDamaged(vehicle, !invincible);
            SetVehicleExplodesOnHighExplosionDamage(vehicle, !invincible);
        }
    }

    async spawnUserInputVehicle() {
        this.trainer.blockInput = true;

        const model = await getUserInput(64, 'Enter internal vehicle name');
        const vehicle = await spawnVehicle(model);

        // Wait a few frames so that the messagebox doesn't start again immediately
        await delay(10);
        this.trainer.blockInput = false;

        return vehicle;
    }

    onNewVehicle() {
        const config = getConfig();
        const vehicle = GetVehiclePedIsUsing(PlayerPedId());

        if (config.getBool('RainbowChrome')) {
            this.setChrome(vehicle);
        }

        if (config.getBool('InvincibleVehicle')) {
            SetEntityHealth(vehicle, GetEntityMaxHealth(vehicle));
            SetVehicleDirtLevel(vehicle, 0);
            SetVehicleEngineHealth(vehicle, 1000);
            SetVehicleFixed(vehicle);
        }
    }

    private setChrome(vehicle: number) {
        const chrome = VehicleColor.Chrome;

        ClearVehicleCustomPrimaryColour(vehicle);
        ClearVehicleCustomSecondaryColour(vehicle);
        SetVehicleColours(vehicle, chrome, chrome);
    }
}
