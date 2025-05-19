console.log('[virakal-menu] Client Resource Started');

import { delay } from '@common/utils';
import Trainer from 'Trainer';

RegisterNuiCallback(
	'uiReady',
	async (data: NuiData, cb: NuiCallback): Promise<NuiCallback> => {
		console.log('UI ready');

		await delay(10);
		new Trainer();

		cb('Initialised');
		return cb;
	},
);
