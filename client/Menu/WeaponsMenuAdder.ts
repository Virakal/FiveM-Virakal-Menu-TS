import { MenuAdder } from 'Menu/MenuAdder';
import type { MenuMap } from '@common/Menu';

@MenuAdder.register
export default class WeaponsMenuAdder {
	add(menus: MenuMap) {
		menus.set('weapons', [
			{
				text: 'Spawn With All Weapons',
				action: 'spawngiveallweapons',
				state: 'ON',
				configkey: 'SpawnGiveAllWeapons',
			},
			{
				text: 'Infinite Ammo',
				action: 'weaponconfig ammo',
				state: 'ON',
				configkey: 'InfiniteAmmo',
			},
			{
				text: 'Infinite Clip',
				action: 'weaponconfig clip',
				state: 'ON',
				configkey: 'InfiniteClip',
			},
			{
				text: 'Give All Weapons',
				action: 'giveallweapons',
			},
		]);

		return menus;
	}
}
