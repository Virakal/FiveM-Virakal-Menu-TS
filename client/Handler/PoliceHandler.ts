import getConfig from "Config";
import { delay, notify } from "@shared/utils";

export default class PoliceHandler implements Handler {
    private config;

    constructor() {
        this.config = getConfig();

        this.config.setDefaults({
            PoliceDisable: false,
            PoliceIgnore: false,
        });

        RegisterNuiCallback('policedisable', this.onPoliceDisable.bind(this));
        RegisterNuiCallback('policeignore', this.onPoliceIgnore.bind(this));
        RegisterNuiCallback('wantedlevel', this.onWantedLevel.bind(this));

        setTick(this.disablePolice.bind(this));
    }

    onPoliceDisable(data: NuiData, cb: NuiCallback): NuiCallback {
        this.config.set('PoliceDisable', data.newstate ? 'true' : 'false');

        cb('ok');
        return cb;
    }

    onPoliceIgnore(data: NuiData, cb: NuiCallback): NuiCallback {
        this.config.set('PoliceIgnore', data.newstate ? 'true' : 'false');

        cb('ok');
        return cb;
    }

    onWantedLevel(data: NuiData, cb: NuiCallback): NuiCallback {
        const level = Number.parseInt(data.action);

        this.setWantedLevelNow(level);

        if (level > 0) {
            this.config.set('PoliceDisable', false);
            this.config.set('PoliceIgnore', false);
        }

        notify(`~g~Changed wanted level to ${level}`);

        cb('ok');
        return cb;
    }

    async disablePolice() {
        const playerId = PlayerId();

        if (this.config.getBool('PoliceDisable')) {
            const ped = PlayerPedId();
            const vehicle = GetVehiclePedIsUsing(ped);

            if (
                // On foot...
                !vehicle
                // Or in driving seat
                || GetPedInVehicleSeat(vehicle, -1)
                // Or alone in the vehicle
                || GetVehicleNumberOfPassengers(vehicle) < 2
            ) {
                this.setWantedLevelNow(0);
            }
        }

        SetPoliceIgnorePlayer(playerId, this.config.getBool('PoliceIgnore'));

        await delay(10);
    }

    setWantedLevelNow(level: number) {
        const playerId = PlayerId();

        SetPlayerWantedLevel(playerId, level, false);
        SetPlayerWantedLevelNow(playerId, false);
    }
}
