import { delay, getEntityPosition, notify, withModel } from '@common/utils';

export default class AnimalBombHandler implements Handler {
    bombCount = 10;

    constructor() {
        RegisterNuiCallback('anibomb', this.onAniBomb.bind(this));
    }

    async onAniBomb(data: NuiData, cb: NuiCallback): Promise<NuiCallback> {
        // Return early and do the rest async
        cb('ok');

        const model = data.action;

        const variance = 10;
        const halfVariance = Math.floor(variance / 2);
        const height = 20;
        const heightVariance = 5;

        await withModel(model, async (model, loaded) => {
            if (!loaded) {
                notify('~r~Failed to load model for bomb');
                return;
            }

            const playerPed = PlayerPedId();
            const position = getEntityPosition(playerPed);

            for (let i = 0; i < this.bombCount; i++) {
                const heading = 360 * Math.random();

                const spawnPosition = position.withOffsets(
                    halfVariance - (Math.random() * variance),
                    halfVariance - (Math.random() * variance),
                    height + (Math.random() * heightVariance),
                );

                console.log(`Dropping animal ${i + 1} at ${spawnPosition}, heading ${heading.toFixed(2)}`);

                CreatePed(0, model, spawnPosition.x, spawnPosition.y, spawnPosition.z, heading, true, true);

                // Stagger spawns
                await delay(Math.random() * 15);
            }
        })

        return cb;
    }
}
