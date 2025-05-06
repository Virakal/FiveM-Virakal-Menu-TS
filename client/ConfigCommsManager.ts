import getConfig from '@common/Config';
import { delay, sendUIMessage } from "@common/utils";

export default class ConfigCommsManager {
    constructor() {
        onNet('virakalMenu:returnConfig', this.onReturnConfig);
        emitNet('virakalMenu:getConfig');
    }

    async onReturnConfig(configData: { [key: string]: string }) {
        const config = getConfig();
        config.fromObject(configData);
        sendUIMessage({ configupdate: true, config: configData });

        await delay(1);

        emit('virakalMenu:configFetched');
    }
}
