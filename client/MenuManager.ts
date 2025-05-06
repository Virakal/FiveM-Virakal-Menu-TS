import MainMenuAdder from "Menu/MainMenuAdder";
import AnimalBombMenuAdder from "Menu/AnimalBombMenuAdder";
import AnimationMenuAdder from "Menu/AnimationMenuAdder";
import PlayerMenuAdder from "Menu/PlayerMenuAdder";
import PoliceMenuAdder from "Menu/PoliceMenuAdder";
import SettingsMenuAdder from "Menu/SettingsMenuAdder";
import TeleportMenuAdder from "Menu/TeleportMenuAdder";
import UIMenuAdder from "Menu/UIMenuAdder";
import WeaponsMenuAdder from "Menu/WeaponsMenuAdder";
import { delay, sendUIMessage } from "@common/utils";

export default class MenuManager {
    menu: MenuMap = new Map();
    menuAdders: MenuAdder[] = [];

    constructor() {
        this.menuAdders = [
            new AnimalBombMenuAdder(),
            new AnimationMenuAdder(),
            new MainMenuAdder(),
            new PlayerMenuAdder(),
            new PoliceMenuAdder(),
            new SettingsMenuAdder(),
            new TeleportMenuAdder(),
            new UIMenuAdder(),
            new WeaponsMenuAdder(),
        ];

        on('virakal:allMenusSent', () => this.onMenusSent())
        on('virakal:configFetched', () => this.onConfigFetched())
    }

    onConfigFetched() {
        console.log('Config fetched');
        this.initMenus();
        this.sendAllMenus();
    }

    sendMenu(name: string) {
        sendUIMessage({
            setmenu: true,
            menuname: name,
            menudata: this.menu.get(name),
        })
    }

    async sendAllMenus() {
        for (const [key, value] of this.menu) {
            this.sendMenu(key);
            await delay(10);
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
