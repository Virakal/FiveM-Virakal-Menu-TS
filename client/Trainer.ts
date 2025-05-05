import { Delay } from "client";
import getConfig from "Config";
import AnimalBombHandler from "Handler/AnimalBombHandler";
import type { Handler } from "Handler/Handler";
import MenuManager from "MenuManager";

// const KEY_TOGGLE_MENU = 167; // temp disabled - F6
const KEY_TOGGLE_MENU = 168; // F7
const KEY_SELECT = 176; // Enter/LMB
const KEY_BACK = 177; // Backspace/Esc/RMB
const KEY_UP = 172;
const KEY_DOWN = 173;
const KEY_LEFT = 174;
const KEY_RIGHT = 175;

export default class Trainer {
    menuManager: MenuManager;
    handlers: Handler[] = []

    blockInput = false;
    showTrainer = false;
    _config = getConfig();

    get config() {
        return this._config;
    }

    private set config(config) {
        this._config = config;
    }

    constructor() {
        this.menuManager = new MenuManager(this, this.config);

        setTick(() => this.handleMenuKeys());
        setImmediate(() => this.onLoad());
    }

    onLoad() {
        this.registerHandlers();

        RegisterNuiCallback('trainerclose', (data: any, cb: CallableFunction) => this.onTrainerClose(data, cb));
        RegisterNuiCallback('playsound', (data: any, cb: CallableFunction) => this.onPlaySound(data, cb));

        this.maxPlayerStats();

        this.notify('~y~Virakal Menu loaded!');
    }

    onTrainerClose(data: any, callback: CallableFunction) {
        this.showTrainer = false;
        callback('ok');
        return callback;
    }

    onPlaySound(data: any, callback: CallableFunction) {
        PlaySoundFrontend(-1, data.name, 'HUD_FRONTEND_DEFAULT_SOUNDSET', true);
        callback('ok');
        return callback;
    }

    sendUIMessage(message: object) {
        SendNUIMessage(message);
    }

    notify(message: string) {
        SetNotificationTextEntry('STRING');
        AddTextComponentString(message);
        DrawNotification(false, false);
    }

    shouldHandleControl(key: number, checkShowTrainer: boolean = true) {
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
        if (this.shouldHandleControl(KEY_TOGGLE_MENU, false)) {
            this.showTrainer = !this.showTrainer;

            if (this.showTrainer) {
                this.sendUIMessage({ showtrainer: true });
            } else {
                this.sendUIMessage({ hidetrainer: true });
            }
        }

        // Enter / Back
        if (this.shouldHandleControl(KEY_SELECT)) {
            this.sendUIMessage({ trainerenter: true })
        } else if (this.shouldHandleControl(KEY_BACK)) {
            this.sendUIMessage({ trainerback: true })
        }

        // Up / Down
        if (this.shouldHandleControl(KEY_UP)) {
            this.sendUIMessage({ trainerup: true })
        } else if (this.shouldHandleControl(KEY_DOWN)) {
            this.sendUIMessage({ trainerdown: true })
        }

        // Left / Right
        if (this.shouldHandleControl(KEY_LEFT)) {
            this.sendUIMessage({ trainerleft: true })
        } else if (this.shouldHandleControl(KEY_RIGHT)) {
            this.sendUIMessage({ trainerright: true })
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
        ]

        for (const stat of stats) {
            StatSetInt(GetHashKey(stat), 100, true);
        }
    }

    registerHandlers() {
        this.handlers = [
            new AnimalBombHandler(this),
        ];
    }

    async loadModel(model: string | number): Promise<boolean> {
        // TODO: Add timeout
        console.log(`Loading model ${model}...`);

        RequestModel(model);

        while (!HasModelLoaded(model)) {
            await Delay(1);
        }

        console.log(`Loaded model ${model}...`);

        return true;
    }
}
