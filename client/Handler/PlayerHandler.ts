import getConfig from '@common/Config';
import PedModelList from '@common/Data/PedModelList';
import {
	delay,
	getPedVehicleSeat,
	type Model,
	notify,
	withModel,
} from '@common/utils';

const RECENT_SKIN_COUNT = 5;

export default class PlayerHandler {
	recentSkins: number[] = [];
	private hasJustRunSpawnHandler = false;

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
		RegisterNuiCallback('playerskin', this.onPlayerSkin.bind(this));
		RegisterNuiCallback('savedefaultskin', this.onSaveDefaultSkin.bind(this));
		RegisterNuiCallback('loaddefaultskin', this.onLoadDefaultSkin.bind(this));
		RegisterNuiCallback(
			'autoloaddefaultskin',
			this.onAutoLoadDefaultSkin.bind(this),
		);

		on('virakalMenu:configFetched', this.onConfigFetched.bind(this));
		on('virakalMenu:skinChange', this.onVirakalSkinChange.bind(this));
		on('playerSpawned', this.onPlayerSpawned.bind(this));

		setTick(this.onTick);
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
				notify(`~g~God mode ${newState ? 'enabled' : 'disabled'}`);
				break;
			case 'stamina':
				config.set('InfiniteStamina', newState);
				notify(`~g~Infinite stamina ${newState ? 'enabled' : 'disabled'}`);
				break;
			case 'autochute':
				config.set('AutoParachute', newState);
				SetAutoGiveParachuteWhenEnterPlane(ped, newState);
				notify(`~g~Auto parachute ${newState ? 'enabled' : 'disabled'}`);
				break;
		}

		cb('ok');
		return cb;
	}

	async onLoadDefaultSkin(
		_data: NuiData,
		cb: NuiCallback,
	): Promise<NuiCallback> {
		const config = getConfig();

		if (config.has('DefaultSkin')) {
			this.loadDefaultSkin();
			notify(`~g~Switched back to ${config.get('DefaultSkin')}.`);
		} else {
			notify("~r~You don't have a default skin saved.");
		}

		cb('ok');
		return cb;
	}

	onSaveDefaultSkin(_data: NuiData, cb: NuiCallback): NuiCallback {
		const config = getConfig();
		config.set('DefaultSkin', config.get('CurrentSkin'));
		notify(`~g~Saved ${config.get('DefaultSkin')} as your default skin.`);

		cb('ok');
		return cb;
	}

	onAutoLoadDefaultSkin(data: NuiData, cb: NuiCallback): NuiCallback {
		const config = getConfig();
		config.set('AutoLoadDefaultSkin', data.newstate);

		cb('ok');
		return cb;
	}

	loadDefaultSkin() {
		const config = getConfig();
		const defaultSkin = config.get('DefaultSkin');
		const ped = PlayerPedId();

		withModel(defaultSkin, (model) => {
			this.hasJustRunSpawnHandler = true;
			this.changePlayerSkin(ped, model);
		});
	}

	async onPlayerSkin(data: NuiData, cb: NuiCallback): Promise<NuiCallback> {
		const modelName = data.action;

		await withModel(modelName, async (model, loaded) => {
			if (loaded) {
				await this.changePlayerSkin(PlayerPedId(), model);
				getConfig().set('CurrentSkin', modelName);
			} else {
				notify(`~r~Failed to load model "${model}"!`);
			}
		});

		cb('ok');
		return cb;
	}

	async changePlayerSkin(ped: number, model: Model): Promise<void> {
		const vehicle = GetVehiclePedIsIn(ped, false);
		const seat = getPedVehicleSeat(ped);

		SetPlayerModel(PlayerId(), model);

		this.updateRecentSkinsList(model);

		emit('playerSpawned');
		emit('virakalMenu:skinChange', model);

		if (seat !== null) {
			SetPedIntoVehicle(ped, vehicle, seat);
		}

		notify(`~g~Changed player skin to "${model}".`);
	}

	async onVirakalSkinChange(modelName: string) {
		const ped = PlayerPedId();

		await delay(0);

		if (!IsPedHuman(ped)) {
			// This fixes crashes on some animal skins
			SetPedComponentVariation(ped, 0, 0, 0, 0);
		} else if (modelName === 'mp_m_freemode_01') {
			// Generic MP Male setup
			SetPedHeadBlendData(ped, 4, 4, 0, 4, 4, 0, 1.0, 1.0, 0.0, false);
			SetPedComponentVariation(ped, 2, 2, 4, 0);
			SetPedComponentVariation(ped, 3, 1, 0, 0);
			SetPedComponentVariation(ped, 4, 33, 0, 0);
			SetPedComponentVariation(ped, 5, 45, 0, 0);
			SetPedComponentVariation(ped, 6, 25, 0, 0);
			SetPedComponentVariation(ped, 8, 56, 1, 0);
			SetPedComponentVariation(ped, 11, 49, 0, 0);
		} else if (modelName === 'mp_f_freemode_01') {
			// Generic MP Female setup
			SetPedHeadBlendData(ped, 25, 25, 0, 25, 25, 0, 1.0, 1.0, 0.0, false);
			SetPedComponentVariation(ped, 2, 13, 3, 0);
			SetPedComponentVariation(ped, 3, 3, 0, 0);
			SetPedComponentVariation(ped, 5, 45, 0, 0);
			SetPedComponentVariation(ped, 6, 25, 0, 0);
			SetPedComponentVariation(ped, 8, 33, 1, 0);
			SetPedComponentVariation(ped, 11, 42, 0, 0);
		}
	}

	updateRecentSkinsList(model: Model) {
		if (typeof model === 'string') {
			// biome-ignore lint/style/noParameterAssign: we are just enforcing a type
			model = GetHashKey(model);
		}

		const modelInfo = PedModelList.getByHash(model);

		if (!modelInfo) {
			return;
		}

		this.recentSkins.unshift(model);
		// Remove duplicates
		this.recentSkins = [...new Set(this.recentSkins)];

		// Remove old entries from list
		this.recentSkins = this.recentSkins.slice(0, RECENT_SKIN_COUNT);

		getConfig().set('RecentSkins', this.recentSkins.join(','));
	}

	async onConfigFetched() {
		const config = getConfig();

		if (config.has('RecentSkins') && config.get('RecentSkins') !== '') {
			this.recentSkins = PlayerHandler.parseRecentSkinsConfig(
				config.get('RecentSkins'),
			);
		}

		if (
			config.has('DefaultSkin') &&
			config.getBool('AutoLoadDefaultSkin') &&
			GetHashKey(config.get('DefaultSkin')) !== GetEntityModel(PlayerPedId())
		) {
			// Wait to allow the game to load more fully
			await delay(1000);
			this.loadDefaultSkin();
		}
	}

	async onPlayerSpawned() {
		// Avoids some timing bugs
		await delay(0);

		// Infinite recursion guard
		if (this.hasJustRunSpawnHandler) {
			this.hasJustRunSpawnHandler = false;
			return;
		}

		const config = getConfig();
		const configSkin = config.get('CurrentSkin');

		if (!configSkin) {
			return;
		}

		const actualSkin = GetEntityModel(PlayerPedId());
		const configSkinHash = GetHashKey(configSkin);

		this.hasJustRunSpawnHandler = true;

		if (actualSkin !== configSkinHash) {
			withModel(configSkin, (model, loaded) => {
				if (loaded) {
					SetPlayerModel(PlayerId(), model);
					emit('playerSpawned', model);
				} else {
					notify(`Failed to restore skin - couldn't load ${configSkin}`);
				}
			});
		}
	}

	static parseRecentSkinsConfig(configData: string) {
		return configData.split(',').map((x) => Number.parseInt(x.trim(), 10));
	}

	async onTick() {
		const config = getConfig();
		const ped = PlayerPedId();
		const playerId = PlayerId();

		if (ped) {
			// TODO: Allow toggling ragdoll
			SetPlayerInvincibleKeepRagdollEnabled(
				playerId,
				config.getBool('GodMode'),
			);

			if (config.getBool('InfiniteStamina')) {
				RestorePlayerStamina(playerId, 100);
			}
		}

		await delay(500);
	}
}
