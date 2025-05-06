import getConfig from "Config";
import { delay, sendUIMessage } from "@shared/utils";

export default class ConfigCommsManager {
    constructor() {
        onNet('virakal:returnConfig', this.onReturnConfig);
        emitNet('virakal:getConfig');
    }

    async onReturnConfig(configData: { [key: string]: string }) {
        getConfig().fromObject(configData);
        // console.log(getConfig().toJson());
        sendUIMessage({ configUpdate: true, config: configData });

        await delay(1);

        emit('virakal:configFetched');
    }
}
