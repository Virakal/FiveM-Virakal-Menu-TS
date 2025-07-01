import { BaseMenuAdder, MenuAdder } from 'Menu/MenuAdder';
import type { MenuItem, MenuMap } from '@common/Menu';
import { delay } from '@common/utils';

const defaultTeleports = {
	'Donkey Punch Farm': '428,6553,28',
	'FIB Building': '134,-748,259',
	'LSIA Airport': '-1075,-2915,15',
	'Logging Camp Road Entrance': '-881,5417,36',
	'Mount Chiliad Summit': '502,5604,798',
	'Observatory Road Entrance': '-408,1173,326',
	"Trevor's Airport": '1777,3253,42',
};

@MenuAdder.register
export default class TeleportMenuAdder extends BaseMenuAdder {
	onMenusAdded() {
		setTick(this.updatePlayerMenu.bind(this));
		on('playerSpawned', () => this.updatePlayerMenu(0));
	}

	add(menus: MenuMap) {
		menus.set('teleport', this.buildTeleportMenu());
		menus.set('teleport.toPlayer', this.getToPlayerMenu());

		return menus;
	}

	async updatePlayerMenu(delayMs = 10000) {
		await delay(delayMs);
		this.menuManager.updateAndSend('teleport.toPlayer', this.getToPlayerMenu());
	}

	private buildTeleportMenu(): MenuItem[] {
		const menu: MenuItem[] = [
			{
				text: 'Show Coords',
				action: 'coords',
			},
			{
				text: 'To Player',
				sub: 'teleport.toPlayer',
			},
			{
				text: 'To Waypoint',
				action: 'telewaypoint',
			},
			{
				text: 'To Last Vehicle',
				action: 'telelastcar',
			},
		];

		for (const [name, coords] of Object.entries(defaultTeleports)) {
			menu.push({
				text: name,
				action: `teleport ${coords}`,
			});
		}

		return menu;
	}

	private getToPlayerMenu(): MenuItem[] {
		const menu: MenuItem[] = [];
		const players = GetActivePlayers();

		for (const playerId of players) {
			const name = GetPlayerName(playerId);
			const serverId = GetPlayerServerId(playerId);

			menu.push({
				text: `${name} (${serverId})`,
				action: `teleplayer ${serverId}`,
			});
		}

		return menu;
	}
}
