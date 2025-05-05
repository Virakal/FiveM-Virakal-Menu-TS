import { delay, loadModel, notify } from 'utils';
import type Trainer from '../Trainer';
import type { Handler } from './Handler';

export default class AnimalBombHandler implements Handler {
    trainer: Trainer;

    bombCount = 10;

    constructor(trainer: Trainer) {
        this.trainer = trainer;

        RegisterNuiCallback('anibomb', (data: NuiData, cb: NuiCallback) => this.onAniBomb(data, cb));
    }

    async onAniBomb(data: NuiData, cb: NuiCallback) {
        // Return early and do the rest async
        cb('ok');

        const model = data.action;

        const variance = 10;
        const halfVariance = Math.floor(variance / 2);
        const height = 20;
        const heightVariance = 5;

        const loaded = await loadModel(model);

        if (!loaded) {
            notify('~r~Failed to load model for bomb');
            return cb;
        }

        const playerPed = GetPlayerPed(-1);
        const [x, y, z] = GetEntityCoords(playerPed, false);

        for (let i = 0; i < this.bombCount; i++) {
            const heading = 360 * Math.random();
            const pos = {
                x: x + (halfVariance - (Math.random() * variance)),
                y: y + (halfVariance - (Math.random() * variance)),
                z: z + (height + (Math.random() * heightVariance)),
            }

            console.log(`Dropping animal ${i + 1} at ${pos.x}, ${pos.y}, ${pos.z}, heading ${heading}`);

            CreatePed(0, model, pos.x, pos.y, pos.z, heading, true, true);

            // Stagger spawns
            await delay(Math.random() * 15);
        }

        SetModelAsNoLongerNeeded(model);
        return cb;
    }
}
