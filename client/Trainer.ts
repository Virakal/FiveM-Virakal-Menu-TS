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

    blockInput = false;
    showTrainer = false;

    constructor() {
        this.menuManager = new MenuManager(this);

        setTick(() => this.handleMenuKeys());
    }

    sendUIMessage(message: object) {
        SendNUIMessage(message);
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
}