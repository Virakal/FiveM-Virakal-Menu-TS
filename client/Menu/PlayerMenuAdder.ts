import PlayerHandler from 'Handler/PlayerHandler';
import { BaseMenuAdder, MenuAdder } from 'Menu/MenuAdder';
import getConfig from '@common/Config';
import PedModelList, { PedModelType } from '@common/Data/PedModelList';
import type PedModelListItem from '@common/Data/PedModelListItem';
import type { MenuItem, MenuMap } from '@common/Menu';

@MenuAdder.register
export default class PlayerMenuAdder extends BaseMenuAdder {
	add(menus: MenuMap) {
		menus.set('player', [
			{
				text: 'Change Skin',
				sub: 'player.skin',
			},
			{
				text: 'Godmode',
				action: 'player god',
				state: 'ON',
				configkey: 'GodMode',
			},
			{
				text: 'Unlimited Stamina',
				action: 'player stamina',
				state: 'ON',
				configkey: 'InfiniteStamina',
			},
			{
				text: 'Heal Player',
				action: 'player heal',
			},
			{
				text: 'Add Armor',
				action: 'player armor',
			},
			{
				text: 'Suicide',
				action: 'player suicide',
			},
			{
				text: 'Auto Plane Parachute',
				action: 'player autochute',
				state: 'ON',
				configkey: 'AutoGiveParachute',
			},
			{
				text: 'Give Parachute',
				action: 'wepgive GADGET_PARACHUTE',
			},
		]);

		menus.set('player.skin', [
			{
				text: 'Recent',
				sub: 'player.skin.recent',
			},
			{
				text: 'Animals',
				sub: 'player.skin.animals',
			},
			{
				text: 'Main Characters',
				sub: 'player.skin.mainCharacters',
			},
			{
				text: 'Pedestrians',
				sub: 'player.skin.pedestrians',
			},
			{
				text: 'Custom',
				sub: 'player.skin.custom',
			},
			{
				text: 'Save Current Skin as Default',
				action: 'savedefaultskin',
			},
			{
				text: 'Change to Default Skin',
				action: 'loaddefaultskin',
			},
			{
				text: 'Autoload Default Skin',
				action: 'autoloaddefaultskin',
				state: 'ON',
				configkey: 'AutoLoadDefaultSkin',
			},
		]);

		menus.set('player.skin.recent', this.getRecentSkinMenu());

		menus.set(
			'player.skin.pedestrians',
			this.toMenuItems(PedModelList.getByType(PedModelType.Human)),
		);
		menus.set(
			'player.skin.animals',
			this.toMenuItems(PedModelList.getByType(PedModelType.Animal)),
		);
		menus.set(
			'player.skin.mainCharacters',
			this.toMenuItems(PedModelList.getByType(PedModelType.MainCharacter)),
		);
		menus.set(
			'player.skin.custom',
			this.toMenuItems(PedModelList.getByType(PedModelType.Custom)),
		);

		return menus;
	}

	onMenusAdded() {
		on('virakalMenu:configChanged', this.onConfigChanged.bind(this));
	}

	onConfigChanged(key: string, _value: string) {
		if (key === 'CurrentSkin') {
			this.menuManager.updateAndSend(
				'player.skin.recent',
				this.getRecentSkinMenu(),
			);
		}
	}

	getRecentSkinMenu(): MenuItem[] {
		const config = getConfig();
		const menu: MenuItem[] = [];
		const actionPrefix = 'playerskin';

		if (config.has('RecentSkins')) {
			const recentSkins = PlayerHandler.parseRecentSkinsConfig(
				config.get('RecentSkins'),
			);

			for (const modelHash of recentSkins) {
				const info = PedModelList.getByHash(modelHash);

				if (info) {
					menu.push({
						text: info.name,
						key: info.modelHash.toString(),
						action: `${actionPrefix} ${info.model}`,
					});
				}
			}
		}

		if (menu.length === 0) {
			menu.push({ text: 'No recent skins yet!' });
		}

		return menu;
	}

	toMenuItems(models: PedModelListItem[]) {
		const menu: MenuItem[] = [];
		const actionPrefix = 'playerskin';

		for (const model of models) {
			menu.push({
				text: model.name,
				action: `${actionPrefix} ${model.model}`,
				key: model.model,
				image: model.image,
			});
		}

		return menu;
	}
}
