import { Delay } from "client";
import MainMenuAdder from "Menu/MainMenuAdder";
import AnimalBombMenuAdder from "Menu/AnimalBombMenuAdder";
import AnimationMenuAdder from "Menu/AnimationMenuAdder";
import PoliceMenuAdder from "Menu/PoliceMenuAdder";
import SettingsMenuAdder from "Menu/SettingsMenuAdder";
import TeleportMenuAdder from "Menu/TeleportMenuAdder";
import UIMenuAdder from "Menu/UIMenuAdder";
import WeaponsMenuAdder from "Menu/WeaponsMenuAdder";
import type Trainer from "Trainer";
import type { Config } from "Config";
import getConfig from "Config";

export default class MenuManager {
    menu: MenuMap = new Map();
    menuAdders: MenuAdder[] = [];

    private trainer: Trainer;
    private config;

    constructor(trainer: Trainer, config: Config) {
        this.trainer = trainer;
        this.config = config;

        this.menuAdders = [
            new AnimalBombMenuAdder(),
            new AnimationMenuAdder(),
            new MainMenuAdder(),
            new PoliceMenuAdder(),
            new SettingsMenuAdder(config),
            new TeleportMenuAdder(),
            new UIMenuAdder(),
            new WeaponsMenuAdder(),
        ];

        on('virakal:allMenusSent', () => this.onMenusSent())
        // on('virakal:configFetched', () => this.onConfigFetched())
        // TODO: Swap this when config storage is implemented
        setTimeout(() => this.onConfigFetched(), 100);
    }

    onConfigFetched() {
        console.log('Config fetched');
        this.initMenus();
        this.sendAllMenus();
    }

    sendMenu(name: string) {
        this.trainer.sendUIMessage({
            setmenu: true,
            menuname: name,
            menudata: this.menu.get(name),
        })
    }

    async sendAllMenus() {
        for (const [key, value] of this.menu) {
            console.log(`Adding menu ${key}`);
            this.sendMenu(key);
            await Delay(10);
        }
    }

    private onMenusSent() {
        // We register actions here so we know menus are loaded already

    }

    private initMenus() {
        for (const adder of this.menuAdders) {
            this.menu = adder.add(this.menu);
        }

        console.log(`Done adding menus: ${this.menu.size} menus.`);
    }
}
