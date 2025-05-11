import getConfig from "@common/Config";
import { SeatPosition } from "@common/Data/ParamEnums";
import { delay, invertColour, notify, rainbowRgb } from "@common/utils";
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
            BoostPower: "75",
            InvincibleVehicle: true,
            MaintainVehicleVelocityOnSwitch: true,
            RainbowChrome: false,
            RainbowNeon: false,
            RainbowNeonInverse: false,
            RainbowPaint: false,
            RainbowSpeed: "0.5",
            SpawnInVehicle: true,
        });

        // // General
        RegisterNuiCallback('veh', this.onVeh.bind(this));
        // RegisterNuiCallback('vehspawn', this.onVehSpawn.bind(this));
        // RegisterNuiCallback('vehsearch', this.onVehSearch.bind(this));
        // RegisterNuiCallback('vehseat', this.onVehSeat.bind(this));

        // // Garage
        // RegisterNuiCallback('vehsave', this.onVehSave.bind(this));
        // RegisterNuiCallback('vehload', this.onVehLoad.bind(this));

        // // Colours
        // RegisterNuiCallback('vehprimary', this.onVehPrimary.bind(this));
        // RegisterNuiCallback('vehsecondary', this.onVehSecondary.bind(this));
        // RegisterNuiCallback('vehboth', this.onVehBoth.bind(this));
        // RegisterNuiCallback('vehpearl', this.onVehPearl.bind(this));
        // RegisterNuiCallback('vehcustomboth', this.onVehCustomBoth.bind(this));
        // RegisterNuiCallback('vehcustomprimary', this.onVehCustomPrimary.bind(this));
        // RegisterNuiCallback('vehcustomsecondary', this.onVehCustomSecondary.bind(this));
        // RegisterNuiCallback('vehlivery', this.onVehLivery.bind(this));
        // RegisterNuiCallback('vehrooflivery', this.onVehRoofLivery.bind(this));
        // RegisterNuiCallback('vehrim', this.onVehRim.bind(this));
        // RegisterNuiCallback('vehdashcolour', this.onVehDashColour.bind(this));
        // RegisterNuiCallback('vehdashtrimcolour', this.onVehTrimColour.bind(this));
        // RegisterNuiCallback('vehtint', this.onVehTint.bind(this));
        // RegisterNuiCallback('vehcolourcombo', this.onVehColourCombo.bind(this));
        RegisterNuiCallback('rainbowspeed', this.onRainbowSpeed.bind(this));
        // RegisterNuiCallback('vehplatetext', this.onVehPlateText.bind(this));
        // RegisterNuiCallback('vehplatestyle', this.onVehPlateStyle.bind(this));
        // RegisterNuiCallback('vehneon', this.onVehNeon.bind(this));
        // RegisterNuiCallback('vehtyresmokecolour', this.onVehTyreSmokeColour.bind(this));
        // RegisterNuiCallback('vehmod', this.onVehMod.bind(this));
        // RegisterNuiCallback('vehmodother', this.onVehModOther.bind(this));

        // // Boost
        // RegisterNuiCallback('boostpower', this.onBoostPower.bind(this));

        // on('virakalMenu:newVehicle', this.onNewVehicle);

        setTick(this.rainbowTick.bind(this));
        // setTick(this.boostTick.bind(this));
        setTick(this.invincibleCarTick.bind(this));
        // setTick(this.checkChangedCar.bind(this));

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
}
