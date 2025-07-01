console.log('[virakal-menu] Client Resource Started');

import Trainer from 'Trainer';
import { delay } from '@common/utils';

RegisterNuiCallback(
	'uiReady',
	async (_data: NuiData, cb: NuiCallback): Promise<NuiCallback> => {
		console.log('UI ready');

		await delay(10);
		new Trainer();

		cb('Initialised');
		return cb;
	},
);
