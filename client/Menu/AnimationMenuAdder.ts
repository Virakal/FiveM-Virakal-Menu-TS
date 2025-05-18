import type { MenuMap } from '@common/Menu';
import { MenuAdder } from 'Menu/MenuAdder';

@MenuAdder.register
export default class AnimationMenuAdder {
	add(menus: MenuMap) {
		menus.set('animation', [
			{
				text: 'Busted',
				action: 'animate arrested',
			},
		]);

		return menus;
	}
}
