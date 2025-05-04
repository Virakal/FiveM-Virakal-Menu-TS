import { Delay } from "client";
import MainMenuAdder from "Menu/MainMenuAdder";
import AnimalBombMenuAdder from "Menu/AnimalBombMenuAdder";
import AnimationMenuAdder from "Menu/AnimationMenuAdder";
import PoliceMenuAdder from "Menu/PoliceMenuAdder";
import TeleportMenuAdder from "Menu/TeleportMenuAdder";
import type Trainer from "Trainer";

export default class MenuManager {
    menu: MenuMap = new Map();
    menuAdders: MenuAdder[] = [];

    private trainer: Trainer;

    constructor(trainer: Trainer) {
        this.trainer = trainer;

        this.menuAdders = [
            new MainMenuAdder(),
            new AnimalBombMenuAdder(),
            new AnimationMenuAdder(),
            new PoliceMenuAdder(),
            new TeleportMenuAdder(),
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
