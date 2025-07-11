import getGarage, {
	GARAGE_CONFIG_KEY_PREFIX,
	GARAGE_MAX_VEHICLE_SLOTS,
} from 'Garage';
import { BaseMenuAdder, MenuAdder } from 'Menu/MenuAdder';
import getConfig from '@common/Config';
import { CustomColour } from '@common/Data/CustomColour';
import { Dlc, DlcName } from '@common/Data/Dlc';
import {
	LicensePlateStyle,
	VehicleClass,
	VehicleColor,
	VehicleModType,
	VehicleNeonLight,
	VehicleSeat,
	VehicleWindowTint,
} from '@common/Data/ParamEnums';
import { getVehicles } from '@common/Data/VehicleList';
import type VehicleListItem from '@common/Data/VehicleListItem';
import type { MenuItem, MenuMap } from '@common/Menu';
import {
	addSpacesToCamelCase,
	cleanColourName,
	getLiveryName,
	getModName,
	getModTypeName,
	getVehicleMods,
	hexToColour,
	loadModel,
} from '@common/utils';

const DEFAULT_BOOST_POWER = 75;

@MenuAdder.register
export default class VehicleMenuAdder extends BaseMenuAdder {
	async add(menus: MenuMap): Promise<MenuMap> {
		menus.set('vehicles', this.getVehiclesMenu());

		menus.set('vehicles.spawn', this.getSpawnMenu());
		menus.set('vehicles.save', this.getGarageSaveMenu());
		menus.set('vehicles.load', this.getGarageLoadMenu());
		menus.set('vehicles.appearance', this.getAppearanceMenu());
		menus.set('vehicles.mods', this.getModsMenu());
		menus.set('vehicles.seats', await this.getSeatsMenu());
		menus.set('vehicles.boostPower', this.getBoostPowerMenu());

		// Add vehicle spawn menus
		menus.set('vehicles.spawn.search', this.getSpawnSearchMenu());
		this.addSpawnByTypeMenus(menus);
		this.addSpawnByDlcMenus(menus);
		menus.set(
			'vehicles.spawn.fun',
			this.getVehicleSpawnMenu(getVehicles().getByTag('fun')),
		);

		// Add vehicle appearance menus
		menus.set('vehicles.appearance.rainbowSettings', this.getRainbowMenu());

		menus.set(
			'vehicles.appearance.rainbowSettings.speed',
			this.getRainbowSpeedMenu(),
		);

		menus.set('vehicles.appearance.numberPlateSettings', this.getPlatesMenu());

		menus.set(
			'vehicles.appearance.windowTintSettings',
			this.getWindowTintMenu(),
		);
		menus.set('vehicles.appearance.livery', await this.getLiveryMenu());
		menus.set('vehicles.appearance.roofLivery', this.getRoofLiveryMenu());

		menus.set(
			'vehicles.appearance.colourCombinations',
			this.getColourCombinationsMenu(),
		);

		menus.set(
			'vehicles.appearance.customBothColour',
			this.getCustomColourMenu('vehcustomboth'),
		);

		menus.set(
			'vehicles.appearance.customPrimaryColour',
			this.getCustomColourMenu('vehcustomprimary'),
		);

		menus.set(
			'vehicles.appearance.customSecondaryColour',
			this.getCustomColourMenu('vehcustomsecondary'),
		);

		menus.set(
			'vehicles.appearance.bothColour',
			this.getPaintColourMenu('vehboth'),
		);

		menus.set(
			'vehicles.appearance.primaryColour',
			this.getPaintColourMenu('vehprimary'),
		);

		menus.set(
			'vehicles.appearance.secondaryColour',
			this.getPaintColourMenu('vehsecondary'),
		);

		menus.set(
			'vehicles.appearance.pearlescentColour',
			this.getPaintColourMenu('vehpearl'),
		);

		menus.set(
			'vehicles.appearance.rimColour',
			this.getPaintColourMenu('vehrim'),
		);

		menus.set(
			'vehicles.appearance.dashColour',
			this.getPaintColourMenu('vehdashcolour'),
		);

		menus.set(
			'vehicles.appearance.trimColour',
			this.getPaintColourMenu('vehtrimcolour'),
		);

		// Add mods menus
		menus.set('vehicles.mods.lights', this.getModLightsMenu());
		menus.set(
			'vehicles.mods.lights.neonColour',
			this.getCustomColourMenu('vehneon'),
		);

		menus.set('vehicles.mods.performance', this.getModPerformanceMenu());
		menus.set('vehicles.mods.wheels', this.getModWheelsMenu());
		menus.set(
			'vehicles.mods.wheels.tyreSmokeColour',
			this.getCustomColourMenu('vehtyresmokecolour'),
		);

		const allMenus = await this.addOtherModsMenus(menus);

		return allMenus;
	}

	onMenusAdded(): void {
		on('virakalMenu:configChanged', this.onConfigChanged.bind(this));
		on('virakalMenu:enteredVehicle', this.updateMenus.bind(this));
		on('virakalMenu:leftVehicle', this.updateMenus.bind(this));
		on('virakalMenu:vehicleModsChanged', this.onNewVehicleMods.bind(this));
	}

	onConfigChanged(key: string, _value: string): void {
		if (key.startsWith(GARAGE_CONFIG_KEY_PREFIX)) {
			this.menuManager.updateAndSend('vehicles.load', this.getGarageLoadMenu());
			this.menuManager.updateAndSend('vehicles.save', this.getGarageSaveMenu());
		}

		switch (key) {
			case 'RainbowSpeed':
				this.menuManager.updateAndSend(
					'vehicles.appearance.rainbowSettings.speed',
					this.getRainbowSpeedMenu(),
				);
				break;
			case 'BoostPower':
				this.menuManager.updateAndSend(
					'vehicles.boostPower',
					this.getBoostPowerMenu(),
				);
				break;
			case 'VehicleSpawnSearchTerm':
				this.menuManager.updateAndSend(
					'vehicles.spawn.search',
					this.getSpawnSearchMenu(),
				);
				break;
		}
	}

	async updateMenus() {
		const menuManager = this.menuManager;
		menuManager.updateAndSend(
			'vehicles.appearance.livery',
			await this.getLiveryMenu(),
		);
		menuManager.updateAndSend(
			'vehicles.appearance.colourCombinations',
			this.getColourCombinationsMenu(),
		);
		menuManager.updateAndSend('vehicles.seats', await this.getSeatsMenu());
		this.onNewVehicleMods(-1, -1);
	}

	async onNewVehicleMods(_type: VehicleModType, _index: number) {
		// TODO: Limit this to the specific modtype and index
		const menus = await this.getOtherModsMenus();

		for (const [k, v] of menus) {
			this.menuManager.updateAndSend(k, v);
		}
	}

	getVehiclesMenu(): MenuItem[] {
		return [
			{
				text: 'Spawn Vehicle',
				sub: 'vehicles.spawn',
			},
			{
				text: 'Load Vehicle from Garage',
				sub: 'vehicles.load',
			},
			{
				text: 'Save Vehicle to Garage',
				sub: 'vehicles.save',
			},
			{
				text: 'Vehicle Appearance',
				sub: 'vehicles.appearance',
			},
			{
				text: 'Vehicle Mods',
				sub: 'vehicles.mods',
			},
			{
				text: 'Change Seats',
				sub: 'vehicles.seats',
			},
			{
				text: 'Fix Vehicle',
				action: 'veh fix',
			},
			{
				text: 'Clean Vehicle',
				action: 'veh clean',
			},
			{
				text: 'Flip Vehicle Onto Wheels',
				action: 'veh flip',
			},
			{
				text: 'Invincible Vehicle',
				action: 'veh invincible',
				state: 'ON',
				configkey: 'InvincibleVehicle',
			},
			{
				text: 'Boost on Horn',
				action: 'veh boosthorn',
				state: 'ON',
				configkey: 'BoostOnHorn',
			},
			{
				text: 'Boost Power',
				sub: 'vehicles.boostPower',
			},
		];
	}

	getSpawnMenu(): MenuItem[] {
		return [
			{
				text: 'Spawn by Searching',
				sub: 'vehicles.spawn.search',
			},
			{
				text: 'Spawn Fun Stuff',
				sub: 'vehicles.spawn.fun',
			},
			{
				text: 'Spawn by Type',
				sub: 'vehicles.spawn.type',
			},
			{
				text: 'Spawn Vehicle by DLC',
				sub: 'vehicles.spawn.dlc',
			},
			{
				text: 'Spawn Vehicle by Internal Name',
				action: 'vehspawn input',
			},
			{
				text: 'Automatic Despawn',
				action: 'vehspawn despawn',
				state: 'ON',
				configkey: 'AutoDespawnVehicle',
			},
			{
				text: 'Spawn Inside Vehicle',
				action: 'vehspawn spawninveh',
				state: 'ON',
				configkey: 'SpawnInVehicle',
			},
		];
	}

	getSpawnSearchMenu(): MenuItem[] {
		const config = getConfig();

		const list: MenuItem[] = [
			{
				text: 'Search for a name...',
				action: 'vehsearch',
			},
		];

		if (config.has('VehicleSpawnSearchTerm')) {
			const term = config.get('VehicleSpawnSearchTerm');
			const vehicles = getVehicles();
			list.push(...this.getVehicleSpawnMenu(vehicles.getBySearchTerm(term)));
		}

		return list;
	}

	getRainbowMenu(): MenuItem[] {
		return [
			{
				text: 'Rainbow Car',
				action: 'veh rainbowcar',
				state: 'OFF',
				configkey: 'RainbowPaint',
			},
			{
				text: 'Rainbow Chrome Car',
				action: 'veh rainbowchrome',
				state: 'OFF',
				configkey: 'RainbowChrome',
			},
			{
				text: 'Rainbow Neons',
				action: 'veh rainbowneon',
				state: 'OFF',
				configkey: 'RainbowNeon',
			},
			{
				text: 'Rainbow Neons (Inverse)',
				action: 'veh rainbowneoninverse',
				state: 'OFF',
				configkey: 'RainbowNeonInverse',
			},
			{
				text: 'Rainbow Speed',
				sub: 'vehicles.appearance.rainbowSettings.speed',
			},
		];
	}

	getPlatesMenu(): MenuItem[] {
		const list: MenuItem[] = [];

		for (const [key, value] of Object.entries(LicensePlateStyle)) {
			if (typeof value !== 'string') {
				continue;
			}

			list.push({
				text: addSpacesToCamelCase(value),
				action: `vehplatestyle ${key}`,
			});
		}

		list.sort((a, b) => a.text.localeCompare(b.text));

		list.unshift({
			text: 'Change Text',
			action: 'vehplatetext',
		});

		return list;
	}

	getWindowTintMenu(): MenuItem[] {
		const list: MenuItem[] = [];

		for (const [key, value] of Object.entries(VehicleWindowTint)) {
			if (typeof value !== 'string') {
				continue;
			}

			list.push({
				text: addSpacesToCamelCase(value),
				action: `vehtint ${key}`,
			});
		}

		return list;
	}

	async getLiveryMenu(): Promise<MenuItem[]> {
		const actionPrefix = 'vehlivery';
		const vehicle = GetVehiclePedIsUsing(PlayerPedId());

		if (!vehicle) {
			return [
				{
					text: 'Enter a vehicle to view liveries',
				},
			];
		}

		const list: MenuItem[] = [
			{
				text: 'No Livery',
				action: `${actionPrefix} -1`,
			},
		];

		SetVehicleModKit(vehicle, 0);

		const liveryCount = GetVehicleLiveryCount(vehicle);

		// This vehicle might use the livery mod instead of the regular livery system - swap that in if appropriate
		if (liveryCount === -1) {
			const modsMenu = await this.getOtherModsMenus();
			const liveryKey = `vehicles.mods.other.${VehicleModType.Livery}`;
			const liveryMenu = modsMenu.get(liveryKey);

			if (liveryMenu?.length > 1) {
				liveryMenu[0].text = 'No Livery';
				return liveryMenu;
			}
		}

		for (let i = 0; i < liveryCount; i++) {
			list.push({
				text: (await getLiveryName(vehicle, i)) ?? `Livery ${i}`,
				action: `${actionPrefix} ${i}`,
			});
		}

		return list;
	}

	getRoofLiveryMenu(): MenuItem[] {
		const actionPrefix = 'vehrooflivery';
		const vehicle = GetVehiclePedIsUsing(PlayerPedId());

		if (!vehicle) {
			return [
				{
					text: 'Enter a vehicle to view liveries',
				},
			];
		}

		const list: MenuItem[] = [
			{
				text: 'No Livery',
				action: `${actionPrefix} -1`,
			},
		];

		for (let i = 0; i < 25; i++) {
			list.push({
				text: `Livery ${i}`,
				action: `${actionPrefix} ${i}`,
			});
		}

		return list;
	}

	getColourCombinationsMenu(): MenuItem[] {
		const vehicle = GetVehiclePedIsUsing(PlayerPedId());

		if (!vehicle) {
			return [
				{
					text: 'Enter a vehicle to view colour combinations',
				},
			];
		}

		SetVehicleModKit(vehicle, 0);

		const list: MenuItem[] = [];
		const comboCount = GetNumberOfVehicleColours(vehicle);

		if (comboCount < 1) {
			return [
				{
					text: "This vehicle doesn't support colour combinations",
				},
			];
		}

		for (let i = 0; i < comboCount; i++) {
			// TODO: Do these have names we can get?
			list.push({
				text: `Colour combination ${i}`,
				action: `vehcolourcombo ${i}`,
			});
		}

		return list;
	}

	getRainbowSpeedMenu(): MenuItem[] {
		const list = [];
		const config = getConfig();
		const defaultSpeed = 50;
		let current = defaultSpeed;

		if (config.has('RainbowSpeed', true)) {
			const configuredSpeed = Number.parseFloat(config.get('RainbowSpeed'));

			if (configuredSpeed > 0) {
				current = Math.round(configuredSpeed * 100);
			}
		}

		for (let speed = 0.1; speed <= 1; speed += 0.1) {
			speed = Number.parseFloat(speed.toFixed(1));
			const percentage = Math.round(100 * speed);

			let text = `${percentage}% Speed`;

			if (percentage === current) {
				text += ' (Current)';
			} else if (percentage === defaultSpeed) {
				text += ' (Default)';
			}

			list.push({
				text,
				action: `rainbowspeed ${speed}`,
			});
		}

		return list;
	}

	getPaintColourMenu(actionPrefix: string): MenuItem[] {
		const list: MenuItem[] = [];

		for (const [key, value] of Object.entries(VehicleColor)) {
			if (typeof value !== 'string') {
				continue;
			}

			list.push({
				text: cleanColourName(value),
				action: `${actionPrefix} ${key}`,
			});
		}

		return list;
	}

	getModLightsMenu(): MenuItem[] {
		const list = [
			{
				text: 'Enable Xenon Headlights',
				action: 'vehmod xenonon',
			},
			{
				text: 'Disable Xenon Headlights',
				action: 'vehmod xenonoff',
			},
			{
				text: 'All Neons On',
				action: 'vehneon allon',
			},
			{
				text: 'All Neons Off',
				action: 'vehneon alloff',
			},
			{
				text: 'Change Neon Colour',
				sub: 'vehicles.mods.lights.neonColour',
			},
		];

		const disableItems = [];

		for (const [key, value] of Object.entries(VehicleNeonLight)) {
			if (typeof value !== 'string') {
				continue;
			}

			list.push({
				text: `Enable ${value} Neon`,
				action: `vehneon on${key}`,
			});

			disableItems.push({
				text: `Disable ${value} Neon`,
				action: `vehneon off${key}`,
			});
		}

		return [...list, ...disableItems];
	}

	getGarageSaveMenu() {
		return this.getGarageMenu('vehsave', 'Save in Slot');
	}

	getGarageLoadMenu() {
		return this.getGarageMenu('vehload', 'Load from Slot');
	}

	private getGarageMenu(actionPrefix: string, namePrefix: string): MenuItem[] {
		const list = [];
		const garage = getGarage();

		for (let i = 1; i <= GARAGE_MAX_VEHICLE_SLOTS; i++) {
			let vehicleName = 'Empty';
			const slot = i.toString();
			const image = '';

			if (garage.hasSavedVehicle(slot)) {
				// TODO: Get image
				const slotInfo = garage.getVehicleInfo(slot);
				vehicleName = slotInfo.displayName;
			}

			list.push({
				text: `${namePrefix} ${i} (${vehicleName})`,
				action: `${actionPrefix} ${i}`,
				image,
			});
		}

		return list;
	}

	getAppearanceMenu(): MenuItem[] {
		return [
			{
				text: 'Both Custom Colour',
				sub: 'vehicles.appearance.customBothColour',
			},
			{
				text: 'Custom Primary Colour',
				sub: 'vehicles.appearance.customPrimaryColour',
			},
			{
				text: 'Custom Secondary Colour',
				sub: 'vehicles.appearance.customSecondaryColour',
			},
			{
				text: 'Both Paint Colour',
				sub: 'vehicles.appearance.bothColour',
			},
			{
				text: 'Paint Primary Colour',
				sub: 'vehicles.appearance.primaryColour',
			},
			{
				text: 'Paint Secondary Colour',
				sub: 'vehicles.appearance.secondaryColour',
			},
			{
				text: 'Pearlescent Colour',
				sub: 'vehicles.appearance.pearlescentColour',
			},
			{
				text: 'Rim Colour',
				sub: 'vehicles.appearance.rimColour',
			},
			{
				text: 'Dashboard Colour',
				sub: 'vehicles.appearance.dashColour',
			},
			{
				text: 'Trim Colour',
				sub: 'vehicles.appearance.trimColour',
			},
			{
				text: 'Colour Combinations',
				sub: 'vehicles.appearance.colourCombinations',
			},
			{
				text: 'Window Tint',
				sub: 'vehicles.appearance.windowTintSettings',
			},
			{
				text: 'Vehicle Livery',
				sub: 'vehicles.appearance.livery',
			},
			{
				text: 'Roof Livery',
				sub: 'vehicles.appearance.roofLivery',
			},
			{
				text: 'Number Plates',
				sub: 'vehicles.appearance.numberPlateSettings',
			},
			{
				text: 'Rainbow Car Settings',
				sub: 'vehicles.appearance.rainbowSettings',
			},
		];
	}

	getModsMenu(): MenuItem[] {
		return [
			{
				text: 'Quick Upgrade',
				action: 'vehmod quickupgrade',
			},
			{
				text: 'Neons & Lights',
				sub: 'vehicles.mods.lights',
			},
			{
				text: 'Performance',
				sub: 'vehicles.mods.performance',
			},
			{
				text: 'Wheels & Tyres',
				sub: 'vehicles.mods.wheels',
			},
			{
				text: 'Other Mods',
				sub: 'vehicles.mods.other',
			},
		];
	}

	async getSeatsMenu(): Promise<MenuItem[]> {
		const vehicle = GetVehiclePedIsUsing(PlayerPedId());

		if (!vehicle) {
			return [
				{
					text: 'Please enter a vehicle to view mods',
				},
			];
		}

		const model = GetEntityModel(vehicle);
		await loadModel(model, 1000, true);
		const seatCount = GetVehicleModelNumberOfSeats(model);

		const items = [
			{
				text: 'Driver Seat',
				action: 'vehseat -1',
			},
		];

		for (let i = 0; i < seatCount; i++) {
			items.push({
				text: `Seat ${i + 1} (${addSpacesToCamelCase(VehicleSeat[i])})`,
				action: `vehseat ${i}`,
			});
		}

		items.push({
			text: 'Any Seat',
			action: 'vehseat -2',
		});

		return items;
	}

	getBoostPowerMenu(): MenuItem[] {
		const config = getConfig();
		const list = [];
		let current = Number.parseInt(config.get('BoostPower'));

		if (Number.isNaN(current) || current < 1) {
			current = DEFAULT_BOOST_POWER;
		}

		for (let power = 25; power <= 150; power += 25) {
			let name = `Power ${power}`;

			if (power === current) {
				name += ' (Current)';
			} else if (power === DEFAULT_BOOST_POWER) {
				name += ' (Default)';
			}

			list.push({
				text: name,
				action: `boostpower ${power}`,
			});
		}

		return list;
	}

	getModWheelsMenu(): MenuItem[] {
		return [
			{
				text: 'Enable Tyre Smoke',
				action: 'vehmod tyresmokeon',
			},
			{
				text: 'Disable Tyre Smoke',
				action: 'vehmod tyresmokeoff',
			},
			{
				text: 'Tyre Smoke Colour',
				sub: 'vehicles.mods.wheels.tyreSmokeColour',
			},
		];
	}

	getModPerformanceMenu(): MenuItem[] {
		return [
			{
				text: 'Add Turbo',
				action: 'vehmod turboon',
			},
			{
				text: 'Remove Turbo',
				action: 'vehmod turbooff',
			},
		];
	}

	async addOtherModsMenus(menus: MenuMap) {
		// TODO: If we ever get Node 23+ we can merge the maps with https://github.com/tc39/proposal-set-methods instead
		for (const [k, v] of await this.getOtherModsMenus()) {
			menus.set(k, v);
		}

		return menus;
	}

	async getOtherModsMenus(): Promise<MenuMap> {
		const menus: MenuMap = new Map();
		const menuParent = 'vehicles.mods.other';
		const vehicle = GetVehiclePedIsUsing(PlayerPedId());

		if (!vehicle) {
			menus.set(menuParent, [
				{
					text: 'Please enter a vehicle to view mods',
				},
			]);

			return menus;
		}

		const mods = getVehicleMods(vehicle);
		const modTypeMenu: MenuItem[] = [];

		for (const [type, currentIndex] of mods) {
			const typeName = await getModTypeName(vehicle, type);
			const modMenu: MenuItem[] = [];

			for (let index = -1; index < GetNumVehicleMods(vehicle, type); index++) {
				let name = await getModName(vehicle, type, index);

				if (!name) {
					name = `${typeName} ${index}`;
				}

				if (index === currentIndex) {
					name += ' (Current)';
				}

				modMenu.push({
					text: name,
					action: `vehmodother ${type}=${index}`,
				});
			}

			const menuKey = `${menuParent}.${type}`;

			menus.set(menuKey, modMenu);

			modTypeMenu.push({
				text: typeName ? typeName : `Unknown mod type ${typeName}`,
				sub: menuKey,
			});
		}

		modTypeMenu.sort((a, b) =>
			a.text.toLocaleLowerCase().localeCompare(b.text.toLocaleLowerCase()),
		);
		menus.set(menuParent, modTypeMenu);

		return menus;
	}

	getCustomColourMenu(actionPrefix: string): MenuItem[] {
		const list: MenuItem[] = [
			{
				text: 'Custom (HTML #RRGGBB or R,G,B)',
				action: `${actionPrefix} input`,
			},
		];

		for (const [name, hex] of Object.entries(CustomColour)) {
			const colour = hexToColour(hex);

			list.push({
				text: addSpacesToCamelCase(name),
				action: `${actionPrefix} ${colour.join(',')}`,
				image: this.getDummyImage(hex),
			});
		}

		return list;
	}

	getDummyImage(hex: string): string {
		const width = 350;
		const height = 200;
		const colour = hex.replace(/^#/, '');

		return `https://dummyimage.com/${width}x${height}/${colour}/${colour}.png&text=Sample`;
	}

	addSpawnByTypeMenus(menus: MenuMap) {
		const vehicles = getVehicles();
		const menu: Record<string, MenuItem[]> = {};
		const baseMenu: MenuItem[] = [];
		const prefix = 'vehicles.spawn.type';

		for (const [className, id] of Object.entries(VehicleClass)) {
			if (typeof id === 'string') {
				continue;
			}

			const name = `${prefix}.${className.toLocaleLowerCase()}`;
			menu[name] = this.getVehicleSpawnMenu(vehicles.getByVehicleClass(id));

			if (menu[name].length === 0) {
				menu[name] = [
					{
						text: 'No vehicles of this type added yet',
					},
				];
			}

			baseMenu.push({
				text: addSpacesToCamelCase(className),
				sub: name,
			});
		}

		for (const key of Object.keys(menu).sort()) {
			menus.set(key, menu[key]);
		}

		menus.set(prefix, baseMenu);
	}

	addSpawnByDlcMenus(menus: MenuMap) {
		const vehicles = getVehicles();
		const menu: Record<string, MenuItem[]> = {};
		const baseMenu: MenuItem[] = [];
		const prefix = 'vehicles.spawn.dlc';

		for (const [className, id] of Object.entries(Dlc)) {
			if (typeof id === 'string') {
				continue;
			}

			const name = `${prefix}.${className.toLocaleLowerCase()}`;
			menu[name] = this.getVehicleSpawnMenu(vehicles.getByDlc(id));

			if (menu[name].length === 0) {
				menu[name] = [
					{
						text: 'No vehicles from this DLC added yet',
					},
				];
			}

			baseMenu.push({
				text: DlcName[id],
				sub: name,
			});
		}

		for (const key of Object.keys(menu).sort()) {
			menus.set(key, menu[key]);
		}

		menus.set(prefix, baseMenu);
	}

	getVehicleSpawnMenu(vehicles: VehicleListItem[]): MenuItem[] {
		return vehicles.map((x) => ({
			text: x.name,
			action: `vehspawn ${x.model}`,
			image: x.image,
		}));
	}
}
