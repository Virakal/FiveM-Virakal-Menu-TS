import { MenuAdder } from 'Menu/MenuAdder';
import 'Menu/MainMenuAdder';
import 'Menu/AnimalBombMenuAdder';
import 'Menu/AnimationMenuAdder';
import 'Menu/PlayerMenuAdder';
import 'Menu/PoliceMenuAdder';
import 'Menu/SettingsMenuAdder';
import 'Menu/TeleportMenuAdder';
import 'Menu/UIMenuAdder';
import 'Menu/VehicleMenuAdder';
import 'Menu/WeaponsMenuAdder';
import { delay, sendUIMessage } from '@common/utils';
import isPromise from 'is-promise';

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

		on('virakalMenu:configFetched', () => this.onConfigFetched());
	}

	async onConfigFetched() {
		console.log('Config fetched');
		await this.initMenus();
		this.sendAllMenus();
	}

	sendMenu(name: string) {
		sendUIMessage({
			setmenu: true,
			menuname: name,
			menudata: this.menu.get(name),
		});
	}

	updateAndSend(key: string, menu: MenuItem[]): void {
		this.menu.set(key, menu);
		this.sendMenu(key);
	}

	async sendAllMenus() {
		for (const [key, _value] of this.menu) {
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

	private async initMenus() {
		for (const adder of this.menuAdders) {
			let menu = adder.add(this.menu);

			if (isPromise(menu)) {
				menu = await menu;
			}

			this.menu = menu;
		}

		console.log(`Done adding menus: ${this.menu.size} menus.`);
	}
}
