import { MenuAdder } from 'Menu/MenuAdder';
import type { MenuMap } from '@common/Menu';

@MenuAdder.register
export default class UIMenuAdder {
	add(menus: MenuMap) {
		menus.set('ui', [
			{
				text: 'Large Minimap',
				action: 'bigmap',
				state: 'OFF',
				configkey: 'BigMap',
			},
			{
				text: 'Large Minimap on Z / D-Pad Down',
				action: 'bigmapondown',
				state: 'ON',
				configkey: 'BigMapOnDown',
			},
		]);

		return menus;
	}
}
