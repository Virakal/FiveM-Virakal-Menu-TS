import ConfigCommsManager from 'ConfigCommsManager';
import Events from 'Events';
import AnimalBombHandler from 'Handler/AnimalBombHandler';
import AnimationHandler from 'Handler/AnimationHandler';
import PlayerHandler from 'Handler/PlayerHandler';
import PoliceHandler from 'Handler/PoliceHandler';
import SettingsHandler from 'Handler/SettingsHandler';
import TeleportHandler from 'Handler/TeleportHandler';
import UIHandler from 'Handler/UIHandler';
import VehicleHandler from 'Handler/VehicleHandler';
import WeaponHandler from 'Handler/WeaponHandler';
import MenuManager from 'MenuManager';
import { Control } from '@common/Data/Controls';
import { notify, sendUIMessage } from '@common/utils';

const KEY_TOGGLE_MENU = Control.SelectCharacterFranklin; // F6
const KEY_TOGGLE_MENU_2 = Control.SelectCharacterTrevor; // F7
const KEY_SELECT = Control.PhoneSelect; // Enter/LMB
const KEY_BACK = Control.PhoneCancel; // Backspace/Esc/RMB
const KEY_UP = Control.PhoneUp;
const KEY_DOWN = Control.PhoneDown;
const KEY_LEFT = Control.PhoneLeft;
const KEY_RIGHT = Control.PhoneRight;

export default class Trainer {
	menuManager: MenuManager;
	handlers: Handler[] = [];

	blockInput = false;
	showTrainer = false;

	constructor() {
		this.menuManager = new MenuManager();

		setTick(() => this.handleMenuKeys());
		setImmediate(() => this.onLoad());
	}

	onLoad() {
		this.registerHandlers();

		new Events();
		new ConfigCommsManager();

		RegisterNuiCallback('trainerclose', this.onTrainerClose.bind(this));
		RegisterNuiCallback('playsound', this.onPlaySound.bind(this));

		this.maxPlayerStats();

		notify('~y~Virakal Menu loaded!');
	}

	onTrainerClose(_data: NuiData, cb: NuiCallback): NuiCallback {
		this.showTrainer = false;
		cb('ok');
		return cb;
	}

	onPlaySound(data: NuiData, cb: NuiCallback): NuiCallback {
		PlaySoundFrontend(-1, data.name, 'HUD_FRONTEND_DEFAULT_SOUNDSET', true);
		cb('ok');
		return cb;
	}

	shouldHandleControl(key: number, checkShowTrainer = true) {
		if (this.blockInput) {
			return false;
		}

		if (checkShowTrainer && !this.showTrainer) {
			return false;
		}

		return IsControlJustReleased(1, key);
	}

	handleMenuKeys() {
		// Show/hide trainer
		if (
			this.shouldHandleControl(KEY_TOGGLE_MENU, false) ||
			this.shouldHandleControl(KEY_TOGGLE_MENU_2, false)
		) {
			this.showTrainer = !this.showTrainer;

			if (this.showTrainer) {
				sendUIMessage({ showtrainer: true });
			} else {
				sendUIMessage({ hidetrainer: true });
			}
		}

		// Enter / Back
		if (this.shouldHandleControl(KEY_SELECT)) {
			sendUIMessage({ trainerenter: true });
		} else if (this.shouldHandleControl(KEY_BACK)) {
			sendUIMessage({ trainerback: true });
		}

		// Up / Down
		if (this.shouldHandleControl(KEY_UP)) {
			sendUIMessage({ trainerup: true });
		} else if (this.shouldHandleControl(KEY_DOWN)) {
			sendUIMessage({ trainerdown: true });
		}

		// Left / Right
		if (this.shouldHandleControl(KEY_LEFT)) {
			sendUIMessage({ trainerleft: true });
		} else if (this.shouldHandleControl(KEY_RIGHT)) {
			sendUIMessage({ trainerright: true });
		}
	}

	/**
	 * Set current player stats to their maximums
	 */
	maxPlayerStats() {
		const stats = [
			'MP0_STAMINA',
			'MP0_STRENGTH',
			'MP0_LUNG_CAPACITY',
			'MP0_WHEELIE_ABILITY',
			'MP0_FLYING_ABILITY',
			'MP0_SHOOTING_ABILITY',
			'MP0_STEALTH_ABILITY',
		];

		for (const stat of stats) {
			StatSetInt(GetHashKey(stat), 100, true);
		}
	}

	registerHandlers() {
		this.handlers = [
			new AnimalBombHandler(),
			new AnimationHandler(),
			new PlayerHandler(),
			new PoliceHandler(),
			new SettingsHandler(),
			new TeleportHandler(),
			new UIHandler(this),
			new VehicleHandler(this),
			new WeaponHandler(),
		];
	}
}
