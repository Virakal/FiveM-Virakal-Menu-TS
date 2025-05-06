import { MenuAdder } from "Menu/MenuAdder";
import "Menu/MainMenuAdder";
import "Menu/AnimalBombMenuAdder";
import "Menu/AnimationMenuAdder";
import "Menu/PlayerMenuAdder";
import "Menu/PoliceMenuAdder";
import "Menu/SettingsMenuAdder";
import "Menu/TeleportMenuAdder";
import "Menu/UIMenuAdder";
import "Menu/WeaponsMenuAdder";
import { delay, sendUIMessage } from "@common/utils";

export default class MenuManager {
    menu: MenuMap = new Map();
    menuAdders: MenuAdder[] = [];

    constructor() {
        const menuAdderClasses = MenuAdder.getImplementations();

        for (const adderClass of menuAdderClasses) {
            const adder = new adderClass();

            if (adder.setManager) {
                adder.setManager(this);
            }

            this.menuAdders.push(adder);
        }

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

    updateAndSend(key: string, menu: MenuItem[]): void {
        this.menu.set(key, menu);
        this.sendMenu(key);
    }

    async sendAllMenus() {
        for (const [key, value] of this.menu) {
            this.sendMenu(key);
            await delay(10);
        }

        this.onMenusSent();
    }

    private onMenusSent() {
        // We register actions here so we know menus are loaded already
        for (const adder of this.menuAdders) {
            if (adder.onMenusAdded) {
                adder.onMenusAdded();
            }
        }
    }

    private initMenus() {
        for (const adder of this.menuAdders) {
            this.menu = adder.add(this.menu);
        }

        console.log(`Done adding menus: ${this.menu.size} menus.`);
    }
}
