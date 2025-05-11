import { delay } from "@common/utils";

export default class Events {
    private lastVehicle = 0;

    constructor() {
        setTick(this.vehicleEvents);
    }

    async vehicleEvents() {
        await delay(0);

        const vehicle = GetVehiclePedIsIn(PlayerPedId(), false);

        if (!vehicle) {
            if (this.lastVehicle) {
                console.log(`Left vehicle ${this.lastVehicle}`);
                emit('virakalMenu:leftVehicle', this.lastVehicle);
            }

            this.lastVehicle = 0;
        } else if (vehicle !== this.lastVehicle) {
            console.log(`Got new vehicle ${vehicle} instead of ${this.lastVehicle}`);
            emit('virakal:enteredVehicle', vehicle, this.lastVehicle);
            this.lastVehicle = vehicle;
        }

        await delay(50);
    }
}
