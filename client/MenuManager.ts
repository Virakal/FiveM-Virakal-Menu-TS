import type Trainer from "Trainer";

export default class MenuManager {
    menus: Map<string, any>;
    
    private trainer: Trainer;

    constructor(trainer: Trainer) {
        this.trainer = trainer;

        this.menus = new Map(Object.entries({
            main: null,
        }));

        on('virakal:allMenusSent', () => this.onMenusSent)
    }

    private onMenusSent() {
        // We register actions here so we know menus are loaded already

    }
}