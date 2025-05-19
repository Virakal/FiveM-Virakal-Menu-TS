import getConfig from '@common/Config';
import { notify } from '@common/utils';

export default class WeaponHandler implements Handler {
	constructor() {
		const config = getConfig();

		config.setDefaults({
			SpawnGiveAllWeapons: 'true',
			InfiniteAmmo: 'true',
			InfiniteClip: 'true',
		});

		RegisterNuiCallback(
			'spawngiveallweapons',
			this.onSpawnGiveAllWeapons.bind(this),
		);

		RegisterNuiCallback('weaponconfig', this.onWeaponConfig.bind(this));

		on('playerSpawned', this.onPlayerSpawn.bind(this));
	}

	onSpawnGiveAllWeapons(data: NuiData, cb: NuiCallback): NuiCallback {
		getConfig().set('SpawnGiveAllWeapons', data.newstate);
		cb('ok');
		return cb;
	}

	onWeaponConfig(data: NuiData, cb: NuiCallback): NuiCallback {
		const config = getConfig();
		const { action, newstate: state } = data;
		const enabledMessage = state ? 'enabled' : 'disabled';

		switch (action) {
			case 'ammo':
				config.set('InfiniteAmmo', state);
				this.setInfiniteAmmo(state);
				notify(`~g~Infinite ammo ${enabledMessage}.`);
				break;
			case 'clip':
				config.set('InfiniteClip', state);
				this.setInfiniteClip(state);
				notify(`~g~Infinite clip ${enabledMessage}.`);
				break;
		}

		cb('ok');
		return cb;
	}

	setInfiniteAmmo(state: boolean) {
		console.log(`Setting infinite ammo to ${JSON.stringify(state)}`);
		SetPedInfiniteAmmo(PlayerPedId(), state, 0);
	}

	setInfiniteClip(state: boolean) {
		console.log(`Setting infinite clip to ${JSON.stringify(state)}`);
		SetPedInfiniteAmmoClip(PlayerPedId(), state);
	}

	giveAllWeapons() {
		// TODO: Implement
	}

	onPlayerSpawn() {
		const config = getConfig();

		if (config.getBool('SpawnGiveAllWeapons')) {
			this.giveAllWeapons();
		}

		this.setInfiniteAmmo(config.getBool('InfiniteAmmo'));
		this.setInfiniteClip(config.getBool('InfiniteClip'));
	}
}
