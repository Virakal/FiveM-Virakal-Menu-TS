import getConfig from "@common/Config";
import { notify } from "@common/utils";

export default class PlayerHandler {
    constructor() {
        const config = getConfig();

        config.setDefaults({
            GodMode: 'true',
            InfiniteStamina: 'false',
            CurrentSkin: '',
            AutoGiveParachute: 'true',
            AutoLoadDefaultSkin: 'true',
        });

        RegisterNuiCallback('player', this.onPlayer.bind(this));
    }

    onPlayer(data: NuiData, cb: NuiCallback): NuiCallback {
        const config = getConfig();
        const ped = PlayerPedId();
        const action = data.action;
        const newState = data.newstate;

        switch (action) {
            case 'heal':
                SetEntityHealth(ped, GetPedMaxHealth(ped));
                notify('~g~Player healed.');
                break;
            case 'armor':
                SetPedArmour(ped, 100);
                notify('~g~Player given armour.');
                break;
            case 'suicide':
                SetEntityHealth(ped, 0);
                notify('~g~Killed player.');
                break;
            case 'god':
                config.set('GodMode', newState);
                notify('~g~God mode ' + (newState ? 'enabled' : 'disabled'));
                break;
            case 'stamina':
                config.set('InfiniteStamina', newState);
                notify('~g~Infinite stamina ' + (newState ? 'enabled' : 'disabled'));
                break;
            case 'autochute':
                config.set('AutoParachute', newState);
                SetAutoGiveParachuteWhenEnterPlane(ped, newState);
                notify('~g~Auto parachute ' + (newState ? 'enabled' : 'disabled'));
                break;
        }

        cb('ok');
        return cb;
    }
}
