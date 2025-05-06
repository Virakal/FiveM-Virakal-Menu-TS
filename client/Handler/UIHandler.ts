import getConfig from '@common/Config';
import Trainer from "Trainer";
import { delay } from "@common/utils";

export default class UIHandler implements Handler {
    // Z / D-pad Down
    mapKey = 20;
    mapShowTime = 2500;
    trainer: Trainer;

    constructor(trainer: Trainer) {
        this.trainer = trainer;

        getConfig().setDefaults({
            BigMap: false,
            BigMapOnDown: true,
        });

        RegisterNuiCallback('bigmap', this.toggleBigMap.bind(this));
        RegisterNuiCallback('bigmapondown', this.toggleBigMapOnDown.bind(this));

        on('virakal:configFetched', this.onConfigFetched.bind(this));

        setTick(this.mapOnDownTick.bind(this));
    }

    async mapOnDownTick() {
        const config = getConfig();

        if (
            !this.trainer.showTrainer
            && config.getBool('BigMapOnDown')
            && !config.getBool('BigMap')
        ) {
            if (IsControlJustPressed(0, this.mapKey)) {
                SetRadarBigmapEnabled(true, false);
            } else if (IsControlJustReleased(0, this.mapKey)) {
                await delay(this.mapShowTime);
                SetRadarBigmapEnabled(false, false);
            }
        }
    }

    toggleBigMap(data: NuiData, cb: NuiCallback): NuiCallback {
        const state = data.newstate;
        getConfig().set('BigMap', state);

        this.setBigMap(state);

        cb('ok');
        return cb;
    }

    toggleBigMapOnDown(data: NuiData, cb: NuiCallback): NuiCallback {
        const state = data.newstate;
        getConfig().set('BigMap', state);

        cb('ok');
        return cb;
    }

    onConfigFetched() {
        const config = getConfig();
        this.setBigMap(config.getBool('BigMap'));
    }

    private setBigMap(value: boolean) {
        SetRadarBigmapEnabled(value, false);
    }
}
