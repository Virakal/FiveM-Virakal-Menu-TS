import type { MenuItem, MenuMap } from '@common/Menu';
import { MenuAdder } from 'Menu/MenuAdder';

@MenuAdder.register
export default class PoliceMenuAdder {
	add(menus: MenuMap) {
		menus.set('police', this.getPoliceMenu());
		return menus;
	}

	private getPoliceMenu() {
		const menu: MenuItem[] = [
			{
				text: 'Disable Police For You',
				action: 'policedisable',
				state: 'OFF',
				configkey: 'PoliceDisable',
			},
			{
				text: 'Police Ignore You',
				action: 'policeignore',
				state: 'OFF',
				configkey: 'PoliceIgnore',
			},
		];

		for (const i in new Array(6).fill(true)) {
			menu.push({
				text: `Wanted Level ${i}`,
				action: `wantedlevel ${i}`,
			});
		}

		return menu;
	}
}
