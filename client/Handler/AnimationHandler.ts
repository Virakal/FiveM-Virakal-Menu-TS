import { loadAnimDict } from "utils";

export default class AnimationHandler implements Handler {
    constructor() {
        RegisterNuiCallback('animate', this.onAnimate);
    }

    async onAnimate(data: NuiData, cb: NuiCallback): Promise<NuiCallback> {
        // TODO This just plays the busted anim at the moment

        const dict = 'random@arrests@busted';
        const anim = 'idle_2_hands_up';

        await loadAnimDict(dict);
        TaskPlayAnim(PlayerPedId(), 'random@arrests', anim, 8, -1, 10000, 0, 1, true, true, true);

        cb('ok');
        return cb;
    }
}
