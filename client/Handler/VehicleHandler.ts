import getConfig from "@common/Config";
import { notify } from "@common/utils";
import type Trainer from "Trainer";

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
        // RegisterNuiCallback('veh', this.onVeh.bind(this));
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

        // setTick(this.rainbowTick.bind(this));
        // setTick(this.boostTick.bind(this));
        // setTick(this.invincibleCarTick.bind(this));
        // setTick(this.checkChangedCar.bind(this));

        if (config.has('RainbowSpeed')) {
            this.rainbowSpeed = Number.parseFloat(config.get('RainbowSpeed')) ?? 0.5;
        }
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
}
