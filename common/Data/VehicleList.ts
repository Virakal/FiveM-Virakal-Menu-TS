import { Dlc } from './Dlc';
import { VehicleClass } from './ParamEnums';
import VehicleListItem from './VehicleListItem';

export class VehicleList {
	vehicles: VehicleListItem[] = [];

	constructor() {
		this.initialiseBoats();
		this.initialiseCommercial();
		this.initialiseCompacts();
		this.initialiseCoupes();
		this.initialiseCycles();
		this.initialiseEmergency();
		this.initialiseHelicopters();
		this.initialiseIndustrial();
		this.initialiseMilitary();
		this.initialiseMotorcycles();
		this.initialiseMuscle();
		this.initialiseOffRoad();
		this.initialisePlanes();
		this.initialiseSedans();
		this.initialiseService();
		this.initialiseSports();
		this.initialiseSportsClassics();
		this.initialiseSuper();
		this.initialiseSUVs();
		this.initialiseUtility();
		this.initialiseVans();
	}

	getByVehicleClass(vehicleClass: VehicleClass): VehicleListItem[] {
		return this.vehicles
			.filter((x) => x.vehicleClass === vehicleClass)
			.sort(this.nameSort);
	}

	getByTag(tag: string): VehicleListItem[] {
		return this.vehicles.filter((x) => x.hasTag(tag)).sort(this.nameSort);
	}

	getByDlc(dlc: Dlc): VehicleListItem[] {
		return this.vehicles.filter((x) => x.dlc === dlc).sort(this.nameSort);
	}

	getBySearchTerm(term: string): VehicleListItem[] {
		return this.vehicles
			.filter((x) => x.matchesSearchTerm(term))
			.sort(this.nameSort);
	}

	getByHash(hash: number): VehicleListItem {
		return this.vehicles.filter((x) => x.modelhash === hash)[0];
	}

	private nameSort(a: VehicleListItem, b: VehicleListItem): number {
		return a.name.localeCompare(b.name);
	}

	private addClass(vehicleClass: VehicleClass, items: VehicleListItem[]) {
		return items.map((x) => Object.assign(x, { vehicleClass }));
	}

	private initialiseBoats() {
		this.vehicles.push(
			...this.addClass(VehicleClass.Boats, [
				new VehicleListItem({
					name: 'Dinghy',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b6/Dinghy-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20170723192359',
					model: 'dinghy',
				}),

				new VehicleListItem({
					name: 'Dinghy (2-Seater)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a2/Dinghy2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20170723192355',
					model: 'dinghy2',
				}),

				new VehicleListItem({
					name: 'Dinghy (Heist Version)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/2d/Dinghy3-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20170723192356',
					model: 'dinghy3',
				}),

				new VehicleListItem({
					name: 'Dinghy (Yacht Version)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b4/Dinghy4-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20170723192358',
					model: 'dinghy4',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Kraken',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/8e/Kraken-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20150604114553',
					model: 'submersible2',
				}),

				new VehicleListItem({
					name: 'Jetmax',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/e8/Jetmax-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160207130439',
					model: 'jetmax',
				}),

				new VehicleListItem({
					name: 'Marquis',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/22/Marquis-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160410145220',
					model: 'marquis',
				}),

				new VehicleListItem({
					name: 'Police Predator',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/cb/PolicePredator-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160130165212',
					model: 'predator',
				}),

				new VehicleListItem({
					name: 'Seashark',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/60/Seashark-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160410145815',
					model: 'seashark',
				}),

				new VehicleListItem({
					name: 'Seashark (Lifeguard Version)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/81/Seashark2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160410145938',
					model: 'seashark2',
				}),

				new VehicleListItem({
					name: 'Seashark (Yacht Version)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/94/Seashark3-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20151216190935',
					model: 'seashark3',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Speeder',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/33/Speeder-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160117175437',
					model: 'speeder',
					dlc: Dlc.BeachBumContentUpdate,
				}),

				new VehicleListItem({
					name: 'Speeder (Yacht Version)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c2/Speeder2-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20151216190736',
					model: 'speeder2',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Squalo',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/37/Squalo-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160916175317',
					model: 'squalo',
				}),

				new VehicleListItem({
					name: 'Submarine',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/4c/Submersible-Front-GTAV.png/revision/latest/scale-to-width-down/350?cb=20140413124926',
					model: 'submersible',
				}),

				new VehicleListItem({
					name: 'Suntrap',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/6c/Suntrap-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160410150037',
					model: 'suntrap',
				}),

				new VehicleListItem({
					name: 'Toro',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/95/Toro-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20151212235626',
					model: 'toro',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Toro (Yacht Version)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/ed/Toro2-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20151216190811',
					model: 'toro2',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Tropic',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/23/Tropic-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160916175319',
					model: 'tropic',
				}),

				new VehicleListItem({
					name: 'Tropic (Yacht Version)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/57/Tropic2-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20151216190857',
					model: 'tropic2',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Tug',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/44/Tug-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160609144857',
					model: 'tug',
					dlc: Dlc.FurtherAdventuresinFinanceandFelony,
				}),
			]),
		);
	}

	private initialiseCommercial() {
		this.vehicles.push(
			...this.addClass(VehicleClass.Commercial, [
				new VehicleListItem({
					name: 'Benson',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/e8/Benson-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160918135526',
					model: 'benson',
				}),

				new VehicleListItem({
					name: 'Biff',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/30/Biff-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160429175112',
					model: 'biff',
				}),

				new VehicleListItem({
					name: 'Cerberus (Apocalypse)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/0c/ApocalypseCerberus-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181213171922',
					model: 'cerberus',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Cerberus (Future Shock)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/e1/FutureShockCerberus-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181213171922',
					model: 'cerberus2',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Cerberus (Nightmare)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/3c/NightmareCerberus-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181213171923',
					model: 'cerberus3',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Hauler',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/2d/Hauler-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018180550',
					model: 'hauler',
				}),

				new VehicleListItem({
					name: 'Hauler Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/54/HaulerCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170621151444',
					model: 'hauler2',
					tags: ['fun'],
					dlc: Dlc.Gunrunning,
				}),

				new VehicleListItem({
					name: 'Mule',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/07/Mule-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160626145603',
					model: 'mule',
				}),

				new VehicleListItem({
					name: 'Mule (Ramp Door)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/6d/Mule2-GTAO-RampdoorCloseUp.png/revision/latest/scale-to-width-down/350?cb=20180809102310',
					model: 'mule2',
				}),

				new VehicleListItem({
					name: 'Mule (Heist)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/6a/Mule3-GTAO-front.png/revision/latest?cb=20160929163213',
					model: 'mule3',
					dlc: Dlc.HeistsUpdate,
				}),

				new VehicleListItem({
					name: 'Mule Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/16/MuleCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180725180057',
					model: 'mule4',
					dlc: Dlc.AfterHours,
				}),

				new VehicleListItem({
					name: 'Packer',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/68/Packer-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160308175915',
					model: 'packer',
				}),

				new VehicleListItem({
					name: 'Phantom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/ff/Phantom-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160702200418',
					model: 'phantom',
				}),

				new VehicleListItem({
					name: 'Phantom Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/70/PhantomCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170621151532',
					model: 'phantom3',
					dlc: Dlc.Gunrunning,
				}),

				new VehicleListItem({
					name: 'Phantom Wedge',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/1a/PhantomWedge-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161213202825',
					model: 'phantom2',
					tags: ['fun'],
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'Pounder',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/1d/Pounder-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160918143632',
					model: 'pounder',
				}),

				new VehicleListItem({
					name: 'Pounder Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/85/PounderCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180725180226',
					model: 'pounder2',
				}),

				new VehicleListItem({
					name: 'Stockade',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/50/Stockade-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160918143634',
					model: 'stockade',
				}),

				new VehicleListItem({
					name: 'Stockade (Bobcat Snow-Covered)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/65/Stockade3-GTAV-front.png/revision/latest/scale-to-width-down/270?cb=20160918143635',
					model: 'stockade3',
				}),

				new VehicleListItem({
					name: 'Terrorbyte',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/96/Terrorbyte-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180725175825',
					model: 'terbyte',
					tags: ['fun'],
					dlc: Dlc.AfterHours,
				}),
			]),
		);
	}

	private initialiseCompacts() {
		this.vehicles.push(
			...this.addClass(VehicleClass.Compacts, [
				new VehicleListItem({
					name: 'Blista',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c0/Blista-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160409171328',
					model: 'blista',
				}),

				new VehicleListItem({
					name: 'Brioso R/A',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/80/BriosoRA-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160712123349',
					model: 'brioso',
					dlc: Dlc.CunningStunts,
				}),

				new VehicleListItem({
					name: 'Dilettante',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/80/Dilettante-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160305172849',
					model: 'dilettante',
				}),

				new VehicleListItem({
					name: 'Dilettante (Merryweather)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/5b/DilettanteSecurity-GTAV-FrontQuarter.jpg/revision/latest/scale-to-width-down/350?cb=20160312012125',
					model: 'dilettante2',
				}),

				new VehicleListItem({
					name: 'Issi',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/9c/IssiDown-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160305190500',
					model: 'issi2',
				}),

				new VehicleListItem({
					name: 'Issi (Apocalypse)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/ea/ApocalypseIssi-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181214193634',
					model: 'issi4',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Issi (Future Shock)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/7a/FutureShockIssi-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181214193634',
					model: 'issi5',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Issi (Nightmare)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b0/NightmareIssi-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181214193635',
					model: 'issi6',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Issi Classic',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/9f/IssiClassic-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180325152715',
					model: 'issi3',
					tags: ['fun'],
					dlc: Dlc.SouthernSanAndreasSuperSportSeries,
				}),

				new VehicleListItem({
					name: 'Panto',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/ad/Panto-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160406180025',
					model: 'panto',
					dlc: Dlc.ImNotaHipsterUpdate,
				}),

				new VehicleListItem({
					name: 'Prairie',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/06/Prairie-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160429175108',
					model: 'prairie',
				}),

				new VehicleListItem({
					name: 'Rhapsody',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/cc/Rhapsody-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160302171656',
					model: 'rhapsody',
				}),
			]),
		);
	}

	private initialiseCoupes() {
		this.vehicles.push(
			...this.addClass(VehicleClass.Coupes, [
				new VehicleListItem({
					name: 'Cognoscenti Cabrio',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/28/CognoscentiCabrioUp-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160917231450',
					model: 'cogcabrio',
				}),

				new VehicleListItem({
					name: 'Exemplar',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/de/Exemplar-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20150530112831',
					model: 'exemplar',
				}),

				new VehicleListItem({
					name: 'F620',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/f8/F620-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160929162327',
					model: 'f620',
				}),

				new VehicleListItem({
					name: 'Felon',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/de/Felon-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161111225437',
					model: 'felon',
				}),

				new VehicleListItem({
					name: 'Felon GT',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/0f/FelonGTDown-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018180313',
					model: 'felon2',
				}),

				new VehicleListItem({
					name: 'Jackal',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/48/Jackal-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160702195507',
					model: 'jackal',
				}),

				new VehicleListItem({
					name: 'Oracle',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a4/Oracle-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160406180530',
					model: 'oracle2',
				}),

				new VehicleListItem({
					name: 'Oracle XS',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/22/OracleXS-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160409181541',
					model: 'oracle',
				}),

				new VehicleListItem({
					name: 'Sentinel',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/75/SentinelUp-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160702195218',
					model: 'sentinel2',
				}),

				new VehicleListItem({
					name: 'Sentinel XS',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/22/OracleXS-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160409181541',
					model: 'sentinel',
				}),

				new VehicleListItem({
					name: 'Windsor',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/26/Windsor-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20150614114420',
					model: 'windsor',
				}),

				new VehicleListItem({
					name: 'Windsor Drop',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/31/WindsorDropUp-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160607131007',
					model: 'windsor2',
					dlc: Dlc.FurtherAdventuresinFinanceandFelony,
				}),

				new VehicleListItem({
					name: 'Zion',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/cc/Zion-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160929171027',
					model: 'zion',
				}),

				new VehicleListItem({
					name: 'Zion Cabrio',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/cb/ZionCabrioDown-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160929171022',
					model: 'zion2',
				}),
			]),
		);
	}

	private initialiseCycles() {
		this.vehicles.push(
			...this.addClass(VehicleClass.Cycles, [
				new VehicleListItem({
					name: 'BMX',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/64/BMX-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018175629',
					model: 'bmx',
				}),

				new VehicleListItem({
					name: 'Cruiser',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/bd/Cruiser-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018175937',
					model: 'cruiser',
				}),

				new VehicleListItem({
					name: 'Endurex Race Bike',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/53/EndurexRaceBike-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018180230',
					model: 'tribike2',
				}),

				new VehicleListItem({
					name: 'Fixter',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/74/Fixter-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018180352',
					model: 'fixter',
				}),

				new VehicleListItem({
					name: 'Scorcher',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/be/Scorcher-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018180738',
					model: 'scorcher',
				}),

				new VehicleListItem({
					name: 'Tri-Cycles Race Bike',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/5d/Tri-CyclesRaceBike-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018181013',
					model: 'tribike3',
				}),

				new VehicleListItem({
					name: 'Whippet Race Bike',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/3b/WhippetRaceBike-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018181058',
					model: 'tribike',
				}),
			]),
		);
	}

	private initialiseEmergency() {
		this.vehicles.push(
			...this.addClass(VehicleClass.Emergency, [
				new VehicleListItem({
					name: 'Ambulance',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/ee/Ambulance-GTAV-front-LSMC.png/revision/latest/scale-to-width-down/350?cb=20160116221217',
					model: 'ambulance',
				}),

				new VehicleListItem({
					name: 'FIB (Sedan)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/87/FIB-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20151222203022',
					model: 'fbi',
				}),

				new VehicleListItem({
					name: 'FIB (SUV)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/cf/FIB2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20151217204743',
					model: 'fbi2',
				}),

				new VehicleListItem({
					name: 'Fire Truck',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/6d/Firetruck-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160917180852',
					model: 'firetruk',
				}),

				new VehicleListItem({
					name: 'Lifeguard',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/69/Lifeguard-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160111205940',
					model: 'lguard',
				}),

				new VehicleListItem({
					name: 'Park Ranger',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/92/ParkRanger-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160313204018',
					model: 'pranger',
				}),

				new VehicleListItem({
					name: 'Police Bike',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/70/PoliceBike-GTAV-front.png/revision/latest?cb=20170524183918',
					model: 'policeb',
				}),

				new VehicleListItem({
					name: 'Police Cruiser',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/bd/PoliceCruiser-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160311203102',
					model: 'police',
				}),

				new VehicleListItem({
					name: 'Police Cruiser (Buffalo)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b1/PoliceCruiser2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20180331183631',
					model: 'police2',
				}),

				new VehicleListItem({
					name: 'Police Cruiser (Interceptor)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/6b/PoliceCruiser3-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20170524182142',
					model: 'police3',
				}),

				new VehicleListItem({
					name: 'Police Rancher',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/66/PoliceRancher-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20151212235205',
					model: 'policeold1',
				}),

				new VehicleListItem({
					name: 'Police Riot',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/16/PoliceRiot-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20151231203648',
					model: 'riot',
				}),

				new VehicleListItem({
					name: 'Police Roadcruiser',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/37/PoliceRoadcruiser-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20151212235053',
					model: 'policeold2',
				}),

				new VehicleListItem({
					name: 'Police Prison Bus',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/55/PolicePrisonBus-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20170530185420',
					model: 'pbus',
				}),

				new VehicleListItem({
					name: 'Police Transporter',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/60/PoliceTransporter-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160111211416',
					model: 'policet',
				}),

				new VehicleListItem({
					name: 'RCV',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/db/RCV-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180513190138',
					model: 'riot2',
					tags: ['fun'],
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Sheriff Cruiser',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/7e/SheriffCruiser-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160311204301',
					model: 'sheriff',
				}),

				new VehicleListItem({
					name: 'Unmarked Cruiser',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/7b/UnmarkedCruiser-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160308181831',
					model: 'police4',
				}),
			]),
		);
	}

	private initialiseHelicopters() {
		this.vehicles.push(
			...this.addClass(VehicleClass.Helicopters, [
				new VehicleListItem({
					name: 'Akula',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/29/Akula-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218205054',
					model: 'akula',
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Annihilator',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/ac/Annihilator-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161111194433',
					model: 'annihilator',
				}),

				new VehicleListItem({
					name: 'Buzzard',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/02/Buzzard-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160115184835',
					model: 'buzzard',
				}),

				new VehicleListItem({
					name: 'Buzzard Attack Chopper',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d1/BuzzardAttackChopper-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161111194441',
					model: 'buzzard2',
				}),

				new VehicleListItem({
					name: 'Cargobob',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/0e/Cargobob-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161111195100',
					model: 'cargobob',
				}),

				new VehicleListItem({
					name: 'Cargobob Jetsam',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/68/Cargobob2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161111194444',
					model: 'cargobob2',
				}),

				new VehicleListItem({
					name: 'Cargobob TPE',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/e0/Cargobob3-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161111195058',
					model: 'cargobob3',
				}),

				new VehicleListItem({
					name: 'Cargobob Drop Zone',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/84/Cargobob4-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20151216172624',
					model: 'cargobob4',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'FH-1 Hunter',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/dd/FH1-Hunter-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171121154009',
					model: 'hunter',
					dlc: Dlc.SmugglersRun,
				}),

				new VehicleListItem({
					name: 'Frogger',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/05/Frogger-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160116184549',
					model: 'frogger',
				}),

				new VehicleListItem({
					name: 'Frogger TPE Variant',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/7b/Frogger2-GTAV-front.png/revision/latest/scale-to-width-down/185?cb=20161111195701',
					model: 'frogger2',
				}),

				new VehicleListItem({
					name: 'Havok',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/3f/Havok-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170902153031',
					model: 'havok',
					dlc: Dlc.SmugglersRun,
				}),

				new VehicleListItem({
					name: 'Maverick',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/2b/Maverick-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160411164524',
					model: 'maverick',
				}),

				new VehicleListItem({
					name: 'Police Maverick',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/50/PoliceMaverick-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161111195820',
					model: 'polmav',
				}),

				new VehicleListItem({
					name: 'Savage',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/36/Savage-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20151212171103',
					model: 'savage',
					dlc: Dlc.HeistsUpdate,
				}),

				new VehicleListItem({
					name: 'Sea Sparrow',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/5e/SeaSparrow-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180325183202',
					model: 'seasparrow',
					dlc: Dlc.SouthernSanAndreasSuperSportSeries,
				}),

				new VehicleListItem({
					name: 'Skylift',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/f9/Skylift-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161111200404',
					model: 'skylift',
				}),

				new VehicleListItem({
					name: 'SuperVolito',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/4d/SuperVolito-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20151216173044',
					model: 'supervolito',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'SuperVolito Carbon',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/91/SuperVolitoCarbon-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20151216172545',
					model: 'supervolito2',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Swift',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/9c/SwiftClassic-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160117175814',
					model: 'swift',
					dlc: Dlc.SanAndreasFlightSchoolUpdate,
				}),

				new VehicleListItem({
					name: 'Swift Deluxe',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/4d/SwiftDeluxe-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160117170332',
					model: 'swift2',
					dlc: Dlc.IllGottenGainsPart1,
				}),

				new VehicleListItem({
					name: 'Valkyrie',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/0e/Valkyrie-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20151212171243',
					model: 'valkyrie',
					dlc: Dlc.HeistsUpdate,
				}),

				new VehicleListItem({
					name: 'Valkyrie MOD.0',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/77/ValkyrieMOD0-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20151216172704',
					model: 'valkyrie2',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Volatus',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/0e/Volatus-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160609144955',
					model: 'volatus',
					dlc: Dlc.FurtherAdventuresinFinanceandFelony,
				}),
			]),
		);
	}

	private initialiseIndustrial() {
		this.vehicles.push(
			...this.addClass(VehicleClass.Industrial, [
				new VehicleListItem({
					name: 'Cutter',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b4/Cutter-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160917180851',
					model: 'cutter',
				}),

				new VehicleListItem({
					name: 'Dock Handler',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/51/DockHandler-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160606124706',
					model: 'handler',
				}),

				new VehicleListItem({
					name: 'Dozer',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/05/Dozer-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160928192618',
					model: 'bulldozer',
				}),

				new VehicleListItem({
					name: 'Dump',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/18/Dump-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018180117',
					model: 'dump',
					tags: ['fun'],
				}),

				new VehicleListItem({
					name: 'Flatbed',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/71/Flatbed-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018180424',
					model: 'flatbed',
				}),

				new VehicleListItem({
					name: 'Guardian',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/57/Guardian-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160929163508',
					model: 'guardian',
				}),

				new VehicleListItem({
					name: 'Mixer',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/5d/Mixer-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160625231645',
					model: 'mixer',
				}),

				new VehicleListItem({
					name: 'Mixer (Biff Chassis)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/12/Mixer2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160626145602',
					model: 'mixer2',
				}),

				new VehicleListItem({
					name: 'Rubble',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d5/Rubble-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160626150707',
					model: 'rubble',
				}),

				new VehicleListItem({
					name: 'Tipper',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/07/Tipper2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018181106',
					model: 'tiptruck',
				}),

				new VehicleListItem({
					name: 'Tipper (6 Wheels)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/11/Tipper-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018181108',
					model: 'tiptruck2',
				}),
			]),
		);
	}

	private initialiseMilitary() {
		this.vehicles.push(
			...this.addClass(VehicleClass.Military, [
				new VehicleListItem({
					name: 'Anti-Aircraft Trailer',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/fb/AntiAircraftTrailer-GTAO-front.png/revision/latest?cb=20170621145352',
					model: 'trailersmall2',
				}),

				new VehicleListItem({
					name: 'APC',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/5d/APC-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170614144137',
					model: 'apc',
					tags: ['fun'],
					dlc: Dlc.Gunrunning,
				}),

				new VehicleListItem({
					name: 'Barracks',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d4/Barracks-GTAV-front.png/revision/latest?cb=20160529142937',
					model: 'barracks',
				}),

				new VehicleListItem({
					name: 'Barracks (Semi)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/14/BarracksSemi-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20151217203705',
					model: 'barracks2',
				}),

				new VehicleListItem({
					name: 'Barracks (Short Canvas)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/91/Barracks3-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160916175322',
					model: 'barracks3',
					dlc: Dlc.HeistsUpdate,
				}),

				new VehicleListItem({
					name: 'Barrage',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/ba/Barrage-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218202613',
					model: 'barrage',
					tags: ['fun'],
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Chernobog',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c2/Chernobog-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218202730',
					model: 'chernobog',
					tags: ['fun'],
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Crusader',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/37/Crusader-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20151214201316',
					model: 'crusader',
				}),

				new VehicleListItem({
					name: 'Half-Track',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/3f/Halftrack-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170621144406',
					model: 'halftrack',
					tags: ['fun'],
					dlc: Dlc.Gunrunning,
				}),

				new VehicleListItem({
					name: 'Rhino Tank',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/af/RhinoTank-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161111195824',
					model: 'rhino',
					tags: ['fun'],
				}),

				new VehicleListItem({
					name: 'Scarab (Apocalypse)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d5/ApocalypseScarab-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181214193632',
					model: 'scarab',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Scarab (Future Shock)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d9/FutureShockScarab-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181214193633',
					model: 'scarab2',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Scarab (Nightmare)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/7d/NightmareScarab-GTAO-front.png/revision/latest?cb=20181214193633',
					model: 'scarab3',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Thruster',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a9/Thruster-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218195041',
					model: 'thruster',
					tags: ['fun'],
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'TM-02 Khanjali',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/97/Khanjali-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218202915',
					model: 'khanjali',
					tags: ['fun'],
					dlc: Dlc.TheDoomsdayHeist,
				}),
			]),
		);
	}

	private initialiseMotorcycles() {
		this.vehicles.push(
			...this.addClass(VehicleClass.Motorcycles, [
				new VehicleListItem({
					name: 'Akuma',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/9a/Akuma-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160127214020',
					model: 'akuma',
				}),

				new VehicleListItem({
					name: 'Avarus',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/1a/Avarus-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014164948',
					model: 'avarus',
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'Bagger',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/10/Bagger-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160121202520',
					model: 'bagger',
				}),

				new VehicleListItem({
					name: 'Bati 801',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d9/Bati801-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160127211358',
					model: 'bati',
				}),

				new VehicleListItem({
					name: 'Bati 801RR',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/e3/Bati801RR-GTAV-front-Sprunk.png/revision/latest/scale-to-width-down/350?cb=20160214210359',
					model: 'bati2',
				}),

				new VehicleListItem({
					name: 'BF400',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/00/BF400-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014164436',
					model: 'bf400',
					dlc: Dlc.CunningStunts,
				}),

				new VehicleListItem({
					name: 'Carbon RS',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/2d/CarbonRS-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160130214329',
					model: 'carbonrs',
				}),

				new VehicleListItem({
					name: 'Chimera',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/8a/Chimera-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014164901',
					model: 'chimera',
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'Cliffhanger',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/78/Cliffhanger-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014164545',
					model: 'cliffhanger',
					dlc: Dlc.CunningStunts,
				}),

				new VehicleListItem({
					name: 'Daemon',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/f7/Daemon-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160208212049',
					model: 'daemon',
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'Daemon (Gangless)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/6b/Daemon2-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014164637',
					model: 'daemon2',
				}),

				new VehicleListItem({
					name: 'Deathbike (Apocalypse)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/0e/ApocalypseDeathbike-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181215165020',
					model: 'deathbike',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Deathbike (Future Shock)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/ba/FutureShockDeathbike-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181215165020',
					model: 'deathbike2',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Deathbike (Nightmare)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/6e/NightmareDeathbike-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181215165021',
					model: 'deathbike3',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Defiler',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/f5/Defiler-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014165056',
					model: 'defiler',
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'Diabolus',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/47/Diabolus-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=201612141852073',
					model: 'diablous',
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'Diabolus Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/11/DiabolusCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161213202213',
					model: 'diablous2',
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'Double T',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/8c/DoubleT-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160126212153',
					model: 'double',
				}),

				new VehicleListItem({
					name: 'Enduro',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/ef/Enduro-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160302173841',
					model: 'enduro',
					dlc: Dlc.HeistsUpdate,
				}),

				new VehicleListItem({
					name: 'Esskey',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/4e/Esskey-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014165149',
					model: 'esskey',
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'Faggio',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/91/Faggio-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160204205826',
					model: 'faggio2',
				}),

				new VehicleListItem({
					name: 'Faggio Mod',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/07/FaggioMod-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161004182448',
					model: 'faggio3',
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'Faggio Sport',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/50/FaggioSport-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161004182412',
					model: 'faggio',
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'FCR 1000',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/95/FCR1000-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161213202343',
					model: 'fcr',
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'FCR 1000 Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/87/FCR1000Custom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161213202416',
					model: 'fcr2',
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'Gargoyle',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/ea/Gargoyle-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014164757',
					model: 'gargoyle',
					dlc: Dlc.CunningStunts,
				}),

				new VehicleListItem({
					name: 'Hakuchou',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/ab/Hakuchou-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160302173513',
					model: 'hakuchou',
					dlc: Dlc.LastTeamStandingUpdate,
				}),

				new VehicleListItem({
					name: 'Hakuchou Drag',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/fd/HakuchouDrag-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014165253',
					model: 'hakuchou2',
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'Hexer',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/64/Hexer-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160211212015',
					model: 'hexer',
				}),

				new VehicleListItem({
					name: 'Innovation',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/13/Innovation-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160302173556',
					model: 'innovation',
					dlc: Dlc.LastTeamStandingUpdate,
				}),

				new VehicleListItem({
					name: 'Lectro',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/de/Lectro-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160302174105',
					model: 'lectro',
					dlc: Dlc.HeistsUpdate,
				}),

				new VehicleListItem({
					name: 'Manchez',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c6/Manchez-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014165403',
					model: 'manchez',
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'Nemesis',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/4b/Nemesis-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160126214050',
					model: 'nemesis',
				}),

				new VehicleListItem({
					name: 'Nightblade',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/6b/Nightblade-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014165516',
					model: 'nightblade',
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'Oppressor',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/16/Oppressor-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170614143950',
					model: 'oppressor',
					tags: ['fun'],
					dlc: Dlc.Gunrunning,
				}),

				new VehicleListItem({
					name: 'Oppressor Mk. II',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/85/OppressorMkII-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180725181109',
					model: 'oppressor2',
					tags: ['fun'],
					dlc: Dlc.AfterHours,
				}),

				new VehicleListItem({
					name: 'PCJ-600',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/74/PCJ600-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160121201111',
					model: 'pcj',
				}),

				new VehicleListItem({
					name: 'Ruffian',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b5/Ruffian-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160204203142',
					model: 'ruffian',
				}),

				new VehicleListItem({
					name: 'Rat Bike',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b5/RatBike-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161004182129',
					model: 'ratbike',
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'Sanctus',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/be/Sanctus-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161004182302',
					model: 'sanctus',
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'Sanchez',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/93/Sanchez2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160222221404',
					model: 'sanchez2',
				}),

				new VehicleListItem({
					name: 'Sanchez Livery',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/5f/Sanchez-GTAV-front-Shrewsbury.png/revision/latest/scale-to-width-down/350?cb=20160222221201',
					model: 'sanchez',
				}),

				new VehicleListItem({
					name: 'Shotaro',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/df/Shotaro-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161004182220',
					model: 'shotaro',
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'Sovereign',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/98/Sovereign-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160302172751',
					model: 'sovereign',
					dlc: Dlc.IndependenceDaySpecial,
				}),

				new VehicleListItem({
					name: 'Thrust',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/4e/Thrust-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160917232329',
					model: 'thrust',
					dlc: Dlc.HighLifeUpdate,
				}),

				new VehicleListItem({
					name: 'Vader',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/9b/Vader-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160130222000',
					model: 'vader',
				}),

				new VehicleListItem({
					name: 'Vindicator',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/5f/Vindicator-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160304215542',
					model: 'vindicator',
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'Vortex',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/71/Vortex-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161004181943',
					model: 'vortex',
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'Wolfsbane',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/ff/Wolfsbane-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014165611',
					model: 'wolfsbane',
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'Zombie Bobber',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/af/ZombieBobber-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161004181721',
					model: 'zombiea',
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'Zombie Chopper',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/70/ZombieChopper-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161004181804',
					model: 'zombieb',
					dlc: Dlc.Bikers,
				}),
			]),
		);
	}

	private initialiseMuscle() {
		this.vehicles.push(
			...this.addClass(VehicleClass.Muscle, [
				new VehicleListItem({
					name: 'Blade',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/f3/Blade-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160410132747',
					model: 'blade',
					dlc: Dlc.ImNotaHipsterUpdate,
				}),

				new VehicleListItem({
					name: 'Buccaneer',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/9f/Buccaneer-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160406175914',
					model: 'buccaneer',
				}),

				new VehicleListItem({
					name: 'Buccaneer Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a2/BuccaneerCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160502170017',
					model: 'buccaneer2',
					dlc: Dlc.Lowriders,
				}),

				new VehicleListItem({
					name: 'Lurcher',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/0d/Lurcher-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20151021163349',
					model: 'lurcher',
					dlc: Dlc.HalloweenSurprise,
				}),

				new VehicleListItem({
					name: 'Chino',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/17/Chino-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20151209200837',
					model: 'chino',
					dlc: Dlc.IllGottenGainsPart2,
				}),

				new VehicleListItem({
					name: 'Chino Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/3f/ChinoCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160502170102',
					model: 'chino2',
					dlc: Dlc.Lowriders,
				}),

				new VehicleListItem({
					name: 'Clique',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c6/Clique-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181214181626',
					model: 'clique',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Coquette BlackFin',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/df/CoquetteBlackFin-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20180331183558',
					model: 'coquette3',
					dlc: Dlc.IllGottenGainsPart2,
				}),

				new VehicleListItem({
					name: 'Deviant',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/01/Deviant-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181214181627',
					model: 'deviant',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Dominator',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/78/Dominator-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160702195350',
					model: 'dominator',
				}),

				new VehicleListItem({
					name: 'Dominator (Pißwasser)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/cf/PisswasserDominator-GTAVPC-front.png/revision/latest/scale-to-width-down/350?cb=20150529175704',
					model: 'dominator2',
					dlc: Dlc.CunningStunts,
				}),

				new VehicleListItem({
					name: 'Dominator GTX',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/8b/DominatorGTX-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180328210557',
					model: 'dominator3',
					dlc: Dlc.SouthernSanAndreasSuperSportSeries,
				}),

				new VehicleListItem({
					name: 'Dominator (Apocalypse)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/2b/ApocalypseDominator-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181219160805',
					model: 'dominator4',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Dominator (Future Shock)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d6/FutureShockDominator-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20190106171151',
					model: 'dominator5',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Dominator (Nightmare)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/8b/NightmareDominator-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181219160806',
					model: 'dominator6',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Dukes',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/53/Dukes-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20150530114053',
					model: 'dukes',
				}),

				new VehicleListItem({
					name: "Duke O'Death",
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/4d/DukeODeath-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160115200929',
					model: 'dukes2',
					dlc: Dlc.CunningStuntsSpecialVehicleCircuit,
				}),

				new VehicleListItem({
					name: 'Ellie',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/6b/Ellie-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180329205441',
					model: 'ellie',
					dlc: Dlc.SouthernSanAndreasSuperSportSeries,
				}),

				new VehicleListItem({
					name: 'Faction',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/07/Faction-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160502165840',
					model: 'faction',
					dlc: Dlc.Lowriders,
				}),

				new VehicleListItem({
					name: 'Faction Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/f0/FactionCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160502165927',
					model: 'faction2',
					dlc: Dlc.Lowriders,
				}),

				new VehicleListItem({
					name: 'Faction Custom Donk',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/80/FactionCustomDonk-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160316181542',
					model: 'faction3',
					dlc: Dlc.LowridersCustomClassics,
				}),

				new VehicleListItem({
					name: 'Gauntlet',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/dd/Gauntlet-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160304225154',
					model: 'gauntlet',
				}),

				new VehicleListItem({
					name: 'Gauntlet (Redwood)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/05/RedwoodGauntlet-GTAVPC-front.png/revision/latest/scale-to-width-down/350?cb=20150529175454',
					model: 'gauntlet2',
					dlc: Dlc.CunningStunts,
				}),

				new VehicleListItem({
					name: 'Hermes',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/9b/Hermes-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218203929',
					model: 'hermes',
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Hotknife',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/07/Hotknife-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20170530185811',
					model: 'hotknife',
				}),

				new VehicleListItem({
					name: 'Hustler',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/f1/Hustler-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218204121',
					model: 'hustler',
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Impaler',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/43/Impaler-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181214181627',
					model: 'impaler',
				}),

				new VehicleListItem({
					name: 'Impaler (Apocalypse)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/19/ApocalypseImpaler-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20190106171150',
					model: 'impaler2',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Impaler (Future Shock)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/78/FutureShockImpaler-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20190106171150',
					model: 'impaler3',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Impaler (Nightmare)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/71/NightmareImpaler-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20190106171149',
					model: 'impaler4',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Imperator (Apocalypse)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/f2/ApocalypseImperator-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181215165021',
					model: 'imperator',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Imperator (Future Shock)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/40/FutureShockImperator-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181215165022',
					model: 'imperator2',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Imperator (Nightmare)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/82/NightmareImperator-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181215165022',
					model: 'imperator3',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Moonbeam',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b3/Moonbeam-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160502165704',
					model: 'moonbeam',
					dlc: Dlc.Lowriders,
				}),

				new VehicleListItem({
					name: 'Moonbeam Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/94/MoonbeamCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160502165739',
					model: 'moonbeam2',
					dlc: Dlc.Lowriders,
				}),

				new VehicleListItem({
					name: 'Nightshade',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/3e/Nightshade-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20151216172405',
					model: 'nightshade',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Phoenix',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/af/Phoenix-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160304230504',
					model: 'phoenix',
				}),

				new VehicleListItem({
					name: 'Picador',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/5a/Picador-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160304225738',
					model: 'picador',
				}),

				new VehicleListItem({
					name: 'Rat-Loader',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/cd/Rat-Loader-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160304220227',
					model: 'ratloader',
				}),

				new VehicleListItem({
					name: 'Rat-Truck',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/7a/Rat-Truck-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160304220101',
					model: 'ratloader2',
					dlc: Dlc.FestiveSurprise,
				}),

				new VehicleListItem({
					name: 'Ruiner',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/67/Ruiner-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160409181927',
					model: 'ruiner',
				}),

				new VehicleListItem({
					name: 'Ruiner 2000',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/4c/Ruiner2000-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161215193507',
					model: 'ruiner2',
					tags: ['fun'],
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'Sabre Turbo',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/e6/SabreTurbo-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160308180541',
					model: 'sabregt',
				}),

				new VehicleListItem({
					name: 'Sabre Turbo Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/18/SabreTurboCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160316181730',
					model: 'sabregt2',
					dlc: Dlc.LowridersCustomClassics,
				}),

				new VehicleListItem({
					name: 'Slamvan',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/cb/Slamvan-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20151212234539',
					model: 'slamvan',
					dlc: Dlc.FestiveSurprise,
				}),

				new VehicleListItem({
					name: 'Slamvan (Lost)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/61/LostSlamvan2-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20151212170523',
					model: 'slamvan2',
					dlc: Dlc.HeistsUpdate,
				}),

				new VehicleListItem({
					name: 'Slamvan Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/96/SlamvanCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160316181523',
					model: 'slamvan3',
					dlc: Dlc.LowridersCustomClassics,
				}),

				new VehicleListItem({
					name: 'Slamvan (Apocalypse)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/75/ApocalypseSlamvan-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181215165018',
					model: 'slamvan4',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Slamvan (Future Shock)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/dc/FutureShockSlamvan-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181215165019',
					model: 'slamvan5',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Slamvan (Nightmare)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/fe/NightmareSlamvan-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181215165019',
					model: 'slamvan6',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Stallion',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/00/Stallion-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160702194827',
					model: 'stalion',
					dlc: Dlc.CunningStunts,
				}),

				new VehicleListItem({
					name: 'Stallion (Burger Shot)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/36/BurgerShotStallion-GTAVPC-front.png/revision/latest/scale-to-width-down/350?cb=20150529175256',
					model: 'stalion2',
					dlc: Dlc.CunningStunts,
				}),

				new VehicleListItem({
					name: 'Tampa',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d8/Tampa-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160117200133',
					model: 'tampa',
					dlc: Dlc.FestiveSurprise2015,
				}),

				new VehicleListItem({
					name: 'Tampa (Weaponised)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/ea/WeaponizedTampa-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170614144105',
					model: 'tampa3',
					tags: ['fun'],
					dlc: Dlc.Gunrunning,
				}),

				new VehicleListItem({
					name: 'Tulip',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/2b/Tulip-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181214182016',
					model: 'tulip',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Vamos',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/ac/Vamos-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181214201710',
					model: 'vamos',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Vigero',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c4/Vigero-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160305172506',
					model: 'vigero',
				}),

				new VehicleListItem({
					name: 'Virgo',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/24/Virgo-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160302174203',
					model: 'virgo',
					dlc: Dlc.IllGottenGainsPart1,
				}),

				new VehicleListItem({
					name: 'Virgo Classic',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/1b/VirgoClassic-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160316181420',
					model: 'virgo3',
					dlc: Dlc.LowridersCustomClassics,
				}),

				new VehicleListItem({
					name: 'Virgo Classic Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/ca/VirgoClassicCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160410123917',
					model: 'virgo2',
					dlc: Dlc.LowridersCustomClassics,
				}),

				new VehicleListItem({
					name: 'Voodoo',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/15/Voodoo-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160929171018',
					model: 'voodoo',
				}),

				new VehicleListItem({
					name: 'Voodoo Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/fc/VoodooCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160502170144',
					model: 'voodoo2',
					dlc: Dlc.Lowriders,
				}),

				new VehicleListItem({
					name: 'Yosemite',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/09/Yosemite-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218204237',
					model: 'yosemite',
					dlc: Dlc.TheDoomsdayHeist,
				}),
			]),
		);
	}

	private initialiseOffRoad() {
		this.vehicles.push(
			...this.addClass(VehicleClass.OffRoad, [
				new VehicleListItem({
					name: 'Bifta',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/07/Bifta-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160302170310',
					model: 'bifta',
					dlc: Dlc.BeachBumContentUpdate,
				}),

				new VehicleListItem({
					name: 'Blazer',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/35/Blazer-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018175627',
					model: 'blazer',
				}),

				new VehicleListItem({
					name: 'Blazer (Aqua)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/05/BlazerAqua-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161213201629',
					model: 'blazer5',
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'Blazer (Hot Rod)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/05/HotRodBlazer-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160927172000',
					model: 'blazer3',
				}),

				new VehicleListItem({
					name: 'Blazer (Lifeguard)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b4/BlazerLifeguard-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161111194438',
					model: 'blazer2',
				}),

				new VehicleListItem({
					name: 'Blazer (Street)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/6e/StreetBlazer-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161004180649',
					model: 'blazer4',
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'Bodhi',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/8f/Bodhi-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018175819',
					model: 'bodhi2',
				}),

				new VehicleListItem({
					name: 'Brawler',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/6c/Brawler-GTAV-front.png/revision/latest?cb=20160929162450',
					model: 'brawler',
					dlc: Dlc.IllGottenGainsPart2,
				}),

				new VehicleListItem({
					name: 'Bruiser (Apocalypse)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c0/ApocalypseBruiser-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181214173051',
					model: 'bruiser',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Bruiser (Future Shock)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/f4/FutureShockBruiser-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181214173052',
					model: 'bruiser2',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Bruiser (Nightmare)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/61/NightmareBruiser-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181214173052',
					model: 'bruiser3',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Brutus (Apocalypse)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a0/ApocalypseBrutus-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20190106171159',
					model: 'brutus',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Brutus (Future Shock)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/25/FutureShockBrutus-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20190106171159',
					model: 'brutus2',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Brutus (Nightmare)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/2c/NightmareBrutus-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20190106171153',
					model: 'brutus3',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Caracara',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/17/Caracara-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180325152615',
					model: 'caracara',
					tags: ['fun'],
					dlc: Dlc.SouthernSanAndreasSuperSportSeries,
				}),

				new VehicleListItem({
					name: 'Desert Raid',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/6b/DesertRaid-GTAO-front.png/revision/latest?cb=20160712123124',
					model: 'trophytruck2',
					dlc: Dlc.CunningStunts,
				}),

				new VehicleListItem({
					name: 'Dubsta 6x6',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/10/Dubsta6x6-GTAV-front.png/revision/latest?cb=20160304215944',
					model: 'dubsta3',
					dlc: Dlc.ImNotaHipsterUpdate,
				}),

				new VehicleListItem({
					name: 'Dune Buggy',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/cb/DuneBuggy-GTAV-front.png/revision/latest?cb=20160529141843',
					model: 'dune',
				}),

				new VehicleListItem({
					name: 'Dune FAV',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/65/DuneFAV-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170614143657',
					model: 'dune3',
					tags: ['fun'],
					dlc: Dlc.Gunrunning,
				}),

				new VehicleListItem({
					name: 'Duneloader',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/e6/Duneloader-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018180142',
					model: 'dloader',
				}),

				new VehicleListItem({
					name: 'Freecrawler',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a4/Freecrawler-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180725180458',
					model: 'freecrawler',
					tags: ['fun'],
					dlc: Dlc.AfterHours,
				}),

				new VehicleListItem({
					name: 'Injection',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/80/Injection-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160626144335',
					model: 'bfinject',
				}),

				new VehicleListItem({
					name: 'Insurgent',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/fb/Insurgent-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160929162538',
					model: 'insurgent2',
					dlc: Dlc.HeistsUpdate,
				}),

				new VehicleListItem({
					name: 'Insurgent Pick-Up',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/12/InsurgentPickUp-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160929162614',
					model: 'insurgent',
					dlc: Dlc.HeistsUpdate,
				}),

				new VehicleListItem({
					name: 'Insurgent Pick-Up Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/88/InsurgentPickupCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170621145807',
					model: 'insurgent3',
					dlc: Dlc.Gunrunning,
				}),

				new VehicleListItem({
					name: 'Kalahari',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b7/Kalahari-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160302170553',
					model: 'kalahari',
					dlc: Dlc.BeachBumContentUpdate,
				}),

				new VehicleListItem({
					name: 'Kamacho',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/47/Kamacho-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218203725',
					model: 'kamacho',
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Liberator',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/e0/Liberator-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160929162837',
					model: 'monster',
					tags: ['fun'],
					dlc: Dlc.IndependenceDaySpecial,
				}),

				new VehicleListItem({
					name: 'Marshall',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a2/Marshall-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160929162725',
					model: 'marshall',
					tags: ['fun'],
				}),

				new VehicleListItem({
					name: 'Menacer',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a7/Menacer-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180725180613',
					model: 'menacer',
					tags: ['fun'],
					dlc: Dlc.AfterHours,
				}),

				new VehicleListItem({
					name: 'Mesa',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/97/Mesa-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160626145559',
					model: 'mesa',
				}),

				new VehicleListItem({
					name: 'Mesa (Merryweather)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/fd/Mesa3-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160929163600',
					model: 'mesa3',
				}),

				new VehicleListItem({
					name: 'Mesa (Snow-Covered)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/ac/Mesa2-GTAV-front.png/revision/latest/scale-to-width-down/185?cb=20160916164929',
					model: 'mesa2',
				}),

				new VehicleListItem({
					name: 'Nightshark',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/0c/Nightshark-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170614143609',
					model: 'nightshark',
					dlc: Dlc.Gunrunning,
				}),

				new VehicleListItem({
					name: 'Ramp Buggy',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/51/RampBuggy-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/350?cb=20161215155004',
					model: 'dune4',
					tags: ['fun'],
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'Ramp Buggy (Spoilerless)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/55/RampBuggy2-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161213202129',
					model: 'dune5',
					tags: ['fun'],
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'Rancher XL',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/59/RancherXL-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160305190849',
					model: 'rancherxl',
				}),

				new VehicleListItem({
					name: 'Rancher XL (Snow-Covered)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/92/RancherXL2-GTAV-FrontQuarter.png/revision/latest/scale-to-width-down/350?cb=20180505142334',
					model: 'rancherxl2',
				}),

				new VehicleListItem({
					name: 'RC Bandito',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/14/RCBandito-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181217131322',
					model: 'rcbandito',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Rebel',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/6a/Rebel2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160702195655',
					model: 'rebel2',
				}),

				new VehicleListItem({
					name: 'Rusty Rebel',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/65/RustyRebel-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160702195908',
					model: 'rebel',
				}),

				new VehicleListItem({
					name: 'Space Docker',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/fe/SpaceDocker-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160929163022',
					model: 'dune2',
				}),

				new VehicleListItem({
					name: 'Technical',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/41/Technical-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20150530113418',
					model: 'technical',
					dlc: Dlc.HeistsUpdate,
				}),

				new VehicleListItem({
					name: 'Technical Aqua',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/19/TechnicalAqua-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171201201845',
					model: 'technical2',
					tags: ['fun'],
				}),

				new VehicleListItem({
					name: 'Technical Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/74/TechnicalCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170621150631',
					model: 'technical3',
					tags: ['fun'],
					dlc: Dlc.Gunrunning,
				}),

				new VehicleListItem({
					name: 'Riata',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/67/Riata-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218203640',
					model: 'riata',
				}),

				new VehicleListItem({
					name: 'Sandking XL',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/39/SandkingXL-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160626150711',
					model: 'sandking',
				}),

				new VehicleListItem({
					name: 'Sandking SWB',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d7/SandkingSWB-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160626150709',
					model: 'sandking2',
				}),

				new VehicleListItem({
					name: 'Sasquatch (Apocalypse)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/28/ApocalypseSasquatch-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181213201703',
					model: 'monster3',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Sasquatch (Future Shock)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/44/FutureShockSasquatch-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181213201704',
					model: 'monster4',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Sasquatch (Nightmare)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/30/NightmareSasquatch-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181213201704',
					model: 'monster5',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Trophy Truck',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/ec/TrophyTruck-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160712122948',
					model: 'trophytruck',
					dlc: Dlc.CunningStunts,
				}),
			]),
		);
	}

	private initialisePlanes() {
		this.vehicles.push(
			...this.addClass(VehicleClass.Planes, [
				new VehicleListItem({
					name: 'Alpha-Z1',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/50/AlphaZ1-GTAO-front.png/revision/latest?cb=20170902152931',
					model: 'alphaz1',
					dlc: Dlc.SmugglersRun,
				}),

				new VehicleListItem({
					name: 'Avenger',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/fe/Avenger-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218204931',
					model: 'avenger',
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'B-11 Strikeforce',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/11/B11Strikeforce-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180725180742',
					model: 'strikeforce',
					dlc: Dlc.AfterHours,
				}),

				new VehicleListItem({
					name: 'Besra',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/2a/Besra-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160927163752',
					model: 'besra',
					dlc: Dlc.SanAndreasFlightSchoolUpdate,
				}),

				new VehicleListItem({
					name: 'Blimp',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a5/Blimp-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180725180347',
					model: 'blimp3',
					tags: ['fun'],
					dlc: Dlc.AfterHours,
				}),

				new VehicleListItem({
					name: 'Blimp (Atomic)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c3/AtomicBlimp-LSIA-GTAV.png/revision/latest/scale-to-width-down/350?cb=20141021193529',
					model: 'blimp',
					tags: ['fun'],
				}),

				new VehicleListItem({
					name: 'Blimp (Xero)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/5c/Blimp2-GTAV-FrontQuarter.png/revision/latest/scale-to-width-down/350?cb=20180708090330',
					model: 'blimp2',
					tags: ['fun'],
				}),

				new VehicleListItem({
					name: 'Bombushka (No Addons)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/20/RM10-Bombushka-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170902151115',
					model: 'bombushka',
					dlc: Dlc.SmugglersRun,
				}),

				new VehicleListItem({
					name: 'Cargo Plane',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/88/CargoPlane-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20180303174828',
					model: 'cargoplane',
				}),

				new VehicleListItem({
					name: 'Cuban 800',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/bc/Cuban800-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160116190952',
					model: 'cuban800',
				}),

				new VehicleListItem({
					name: 'Dodo',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/23/Dodo-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20150604111147',
					model: 'dodo',
				}),

				new VehicleListItem({
					name: 'Duster',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/7a/Duster-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20150724190610',
					model: 'duster',
				}),

				new VehicleListItem({
					name: 'Howard NX-25',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/89/Howard-NX25-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170902153213',
					model: 'howard',
					dlc: Dlc.SmugglersRun,
				}),

				new VehicleListItem({
					name: 'Hydra',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/07/Hydra-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20151211201554',
					model: 'hydra',
					dlc: Dlc.HeistsUpdate,
				}),

				new VehicleListItem({
					name: 'Jet',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/ed/Jet-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20171009200518',
					model: 'jet',
				}),

				new VehicleListItem({
					name: 'LAZER',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/56/P996LAZER-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20150724190806',
					model: 'lazer',
				}),

				new VehicleListItem({
					name: 'LF-22 Starling',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/7d/LF22-Starling-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170902151441',
					model: 'starling',
					dlc: Dlc.SmugglersRun,
				}),

				new VehicleListItem({
					name: 'Luxor',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/f4/Luxor-GTAV-FrontQuarter.png/revision/latest/scale-to-width-down/350?cb=20180717110504',
					model: 'luxor',
				}),

				new VehicleListItem({
					name: 'Luxor Deluxe',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/1f/LuxorDeluxe-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20150614102306',
					model: 'luxor2',
					dlc: Dlc.IllGottenGainsPart1,
				}),

				new VehicleListItem({
					name: 'Mallard',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/e5/Mallard-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20150724182150',
					model: 'stunt',
				}),

				new VehicleListItem({
					name: 'Mammatus',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/36/Mammatus-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20150724190456',
					model: 'mammatus',
				}),

				new VehicleListItem({
					name: 'Miljet',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/bb/Miljet-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160117181440',
					model: 'miljet',
					dlc: Dlc.SanAndreasFlightSchoolUpdate,
				}),

				new VehicleListItem({
					name: 'Mogul',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/31/Mogul-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170902151951',
					model: 'mogul',
					dlc: Dlc.SmugglersRun,
				}),

				new VehicleListItem({
					name: 'Nimbus',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/76/Nimbus-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160609145048',
					model: 'nimbus',
					dlc: Dlc.FurtherAdventuresinFinanceandFelony,
				}),

				new VehicleListItem({
					name: 'Pyro',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/92/Pyro-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170902153300',
					model: 'pyro',
					dlc: Dlc.SmugglersRun,
				}),

				new VehicleListItem({
					name: 'P-45 Nokota',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/f7/P45-Nokota-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170902151754',
					model: 'nokota',
					dlc: Dlc.SmugglersRun,
				}),

				new VehicleListItem({
					name: 'Rogue',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b7/Rogue-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170902152244',
					model: 'rogue',
					dlc: Dlc.SmugglersRun,
				}),

				new VehicleListItem({
					name: 'Seabreeze',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/77/Seabreeze-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170902153349',
					model: 'seabreeze',
					dlc: Dlc.SmugglersRun,
				}),

				new VehicleListItem({
					name: 'Shamal',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/62/Shamal-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160116190447',
					model: 'shamal',
				}),

				new VehicleListItem({
					name: 'Titan',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/8c/Titan-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160117170647',
					model: 'titan',
				}),

				new VehicleListItem({
					name: 'Tula',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a9/Tula-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170902152810',
					model: 'tula',
					dlc: Dlc.SmugglersRun,
				}),

				new VehicleListItem({
					name: 'Ultralight',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b1/Ultralight-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170902153122',
					model: 'microlight',
					tags: ['fun'],
					dlc: Dlc.SmugglersRun,
				}),

				new VehicleListItem({
					name: 'V-65 Molotok',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a6/V65-Molotok-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170902152647',
					model: 'molotok',
					dlc: Dlc.SmugglersRun,
				}),

				new VehicleListItem({
					name: 'Velum',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/55/Velum-GTAV.jpg/revision/latest/scale-to-width-down/350?cb=20131019014643',
					model: 'velum',
				}),

				new VehicleListItem({
					name: 'Velum 5-Seater',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/38/Velum5Seater-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160302173740',
					model: 'velum2',
					dlc: Dlc.HeistsUpdate,
				}),

				new VehicleListItem({
					name: 'Vestra',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/32/Vestra-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160117175617',
					model: 'vestra',
					dlc: Dlc.TheBusinessUpdate,
				}),

				new VehicleListItem({
					name: 'Volatol',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/99/Volatol-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218203050',
					model: 'volatol',
					dlc: Dlc.TheDoomsdayHeist,
				}),
			]),
		);
	}

	private initialiseSedans() {
		this.vehicles.push(
			...this.addClass(VehicleClass.Sedans, [
				new VehicleListItem({
					name: 'Asea',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/58/Asea-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160406180243',
					model: 'asea',
				}),

				new VehicleListItem({
					name: 'Asea (Snow-covered)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/e3/Asea2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160917180857',
					model: 'asea2',
				}),

				new VehicleListItem({
					name: 'Asterope',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/ec/Asterope-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018175632',
					model: 'asterope',
				}),

				new VehicleListItem({
					name: 'Cognoscenti',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/ff/Cognoscenti-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160117195014',
					model: 'cognoscenti',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Cognoscenti (Armored)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/30/CognoscentiArmored-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160117195043',
					model: 'cognoscenti2',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Cognoscenti 55',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b4/Cognoscenti55-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160117195125',
					model: 'cog55',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Cognoscenti 55 (Armored)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b0/Cognoscenti55Armored-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160117195143',
					model: 'cog552',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Emperor',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/4c/Emperor-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018180208',
					model: 'emperor',
				}),

				new VehicleListItem({
					name: 'Emperor (Beaten)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c8/Emperor2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160626144224',
					model: 'emperor2',
				}),

				new VehicleListItem({
					name: 'Emperor (Snow-covered)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/f5/Emperor3-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160916164928',
					model: 'emperor3',
				}),

				new VehicleListItem({
					name: 'Fugitive',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/5c/Fugitive-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018180444',
					model: 'fugitive',
				}),

				new VehicleListItem({
					name: 'Glendale',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/47/Glendale-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20150530113232',
					model: 'glendale',
					dlc: Dlc.ImNotaHipsterUpdate,
				}),

				new VehicleListItem({
					name: 'Ingot',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/62/Ingot-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160411170058',
					model: 'ingot',
				}),

				new VehicleListItem({
					name: 'Intruder',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/7c/Intruder-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160305191559',
					model: 'intruder',
				}),

				new VehicleListItem({
					name: 'Premier',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/ca/Premier-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018180637',
					model: 'premier',
				}),

				new VehicleListItem({
					name: 'Primo',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/10/Primo-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160406175756',
					model: 'primo',
				}),

				new VehicleListItem({
					name: 'Primo Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/ca/PrimoCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20151021162950',
					model: 'primo2',
					dlc: Dlc.Lowriders,
				}),

				new VehicleListItem({
					name: 'Regina',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/71/Regina-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160625231110',
					model: 'regina',
				}),

				new VehicleListItem({
					name: 'Schafter',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/57/Schafter-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160409181945',
					model: 'schafter2',
				}),

				new VehicleListItem({
					name: 'Schafter LWB (Armoured)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c3/SchafterLWBArmored-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20151216172313',
					model: 'schafter6',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Schafter V12 (Armoured)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/7c/SchafterV12Armored-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20151216172126',
					model: 'schafter5',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Stafford',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/38/Stafford-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180725175405',
					model: 'stafford',
					dlc: Dlc.AfterHours,
				}),

				new VehicleListItem({
					name: 'Stanier',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/7b/Stanier-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160305182639',
					model: 'stanier',
				}),

				new VehicleListItem({
					name: 'Stratum',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/38/Stratum-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160305185828',
					model: 'stratum',
				}),

				new VehicleListItem({
					name: 'Super Diamond',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d8/SuperDiamond-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160409182331',
					model: 'superd',
				}),

				new VehicleListItem({
					name: 'Surge',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c2/Surge-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018181104',
					model: 'surge',
				}),

				new VehicleListItem({
					name: 'Tailgater',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/e1/Tailgater-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160917232330',
					model: 'tailgater',
				}),

				new VehicleListItem({
					name: 'Turreted Limo',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/39/TurretedLimo-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160119163948',
					model: 'limo2',
					tags: ['fun'],
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Warrener',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/3c/Warrener-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160302171843',
					model: 'warrener',
					dlc: Dlc.ImNotaHipsterUpdate,
				}),

				new VehicleListItem({
					name: 'Washington',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/12/Washington-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160410151922',
					model: 'washington',
				}),

				new VehicleListItem({
					name: 'Romero Hearse',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/15/RomeroHearse-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160929173527',
					model: 'romero',
				}),

				new VehicleListItem({
					name: 'Stretch',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/48/Stretch-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160409182123',
					model: 'stretch',
				}),
			]),
		);
	}

	private initialiseService() {
		this.vehicles.push(
			...this.addClass(VehicleClass.Service, [
				new VehicleListItem({
					name: 'Airport Bus',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/aa/AirportBus-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160917180854',
					model: 'airbus',
				}),

				new VehicleListItem({
					name: 'Brickade',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/65/Brickade-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160607131817',
					model: 'brickade',
				}),

				new VehicleListItem({
					name: 'Bus',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/93/Bus-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20180331183551',
					model: 'bus',
				}),

				new VehicleListItem({
					name: 'Dashound',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/41/Dashound-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018180031',
					model: 'coach',
				}),

				new VehicleListItem({
					name: 'Dune',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/46/Dune-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160712123223',
					model: 'rallytruck',
					dlc: Dlc.CunningStunts,
				}),

				new VehicleListItem({
					name: 'Festival Bus',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/88/FestivalBus-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180725180922',
					model: 'pbus2',
					tags: ['fun'],
					dlc: Dlc.AfterHours,
				}),

				new VehicleListItem({
					name: 'Rental Shuttle Bus',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c8/RentalShuttleBus-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160916175326',
					model: 'rentalbus',
				}),

				new VehicleListItem({
					name: 'Taxi',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/4f/Taxi2-GTAIV-front.png/revision/latest/scale-to-width-down/350?cb=20170223191809',
					model: 'taxi',
				}),

				new VehicleListItem({
					name: 'Tour Bus',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/58/Tourbus-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160916175327',
					model: 'tourbus',
				}),

				new VehicleListItem({
					name: 'Trashmaster',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/58/Trashmaster-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160606122714',
					model: 'trash',
				}),

				new VehicleListItem({
					name: 'Trashmaster (Heist)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/fa/Trashmaster-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160929163342',
					model: 'trash2',
					dlc: Dlc.HeistsUpdate,
				}),

				new VehicleListItem({
					name: 'Wastelander',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/e3/Wastelander-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161213203148',
					model: 'wastelander',
				}),
			]),
		);
	}

	private initialiseSports() {
		this.vehicles.push(
			...this.addClass(VehicleClass.Sports, [
				new VehicleListItem({
					name: '190z',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/be/190z-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218203545',
					model: 'z190',
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Ardent',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/80/Ardent-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170614143447',
					model: 'ardent',
					dlc: Dlc.Gunrunning,
				}),

				new VehicleListItem({
					name: 'Casco',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/86/Casco-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160304220406',
					model: 'casco',
					dlc: Dlc.HeistsUpdate,
				}),

				new VehicleListItem({
					name: 'Cheburek',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/8e/Cheburek-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180720130340',
					model: 'cheburek',
					dlc: Dlc.SanAndreasFlightSchoolUpdate,
				}),

				new VehicleListItem({
					name: 'Cheetah Classic',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/38/CheetahClassic-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170614143349',
					model: 'cheetah2',
					dlc: Dlc.Gunrunning,
				}),

				new VehicleListItem({
					name: 'Coquette Classic',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/0b/CoquetteClassic-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160117175931',
					model: 'coquette2',
					dlc: Dlc.SanAndreasFlightSchoolUpdate,
				}),

				new VehicleListItem({
					name: 'Deluxo',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/15/Deluxo-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218191259',
					model: 'deluxo',
					tags: ['fun'],
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Fagaloa',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/14/Fagaloa-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180325162804',
					model: 'fagaloa',
					dlc: Dlc.SouthernSanAndreasSuperSportSeries,
				}),

				new VehicleListItem({
					name: 'GT500',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/25/GT500-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218203343',
					model: 'gt500',
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Infernus Classic',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/73/InfernusClassic-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170314170313',
					model: 'infernus2',
					dlc: Dlc.CunningStuntsSpecialVehicleCircuit,
				}),

				new VehicleListItem({
					name: 'JB 700',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/70/JB700-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160409201623',
					model: 'jb700',
				}),

				new VehicleListItem({
					name: 'Mamba',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d4/Mamba-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160117195426',
					model: 'mamba',
				}),

				new VehicleListItem({
					name: 'Manana',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d4/Mamba-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160117195426',
					model: 'manana',
				}),

				new VehicleListItem({
					name: 'Michelli GT',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/e0/MichelliGT-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180720130555',
					model: 'michelli',
					dlc: Dlc.SouthernSanAndreasSuperSportSeries,
				}),

				new VehicleListItem({
					name: 'Monroe',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/44/Monroe-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160529141803',
					model: 'monroe',
				}),

				new VehicleListItem({
					name: 'Peyote',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c8/Peyote-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160409202014',
					model: 'peyote',
				}),

				new VehicleListItem({
					name: 'Pigalle',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d4/Pigalle-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160302171416',
					model: 'pigalle',
					dlc: Dlc.ImNotaHipsterUpdate,
				}),

				new VehicleListItem({
					name: 'Rapid GT Classic',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/13/RapidGTClassic-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170916171351',
					model: 'rapidgt3',
					dlc: Dlc.SmugglersRun,
				}),

				new VehicleListItem({
					name: 'Retinue',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b8/Retinue-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171220192309',
					model: 'retinue',
					dlc: Dlc.SmugglersRun,
				}),

				new VehicleListItem({
					name: 'Roosevelt',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b4/Roosevelt-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160214204307',
					model: 'btype',
					dlc: Dlc.ValentinesDayMassacreSpecial,
				}),

				new VehicleListItem({
					name: 'Fränken Stange',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/63/Fr%C3%A4nkenStange-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161014163938',
					model: 'btype2',
					dlc: Dlc.HalloweenSurprise,
				}),

				new VehicleListItem({
					name: 'Roosevelt Valor',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/2a/RooseveltValor-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160214204109',
					model: 'btype3',
					dlc: Dlc.BeMyValentine,
				}),

				new VehicleListItem({
					name: 'Savestra',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d6/Savestra-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218204635',
					model: 'savestra',
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Stinger',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/41/Stinger-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160917231452',
					model: 'stinger',
				}),

				new VehicleListItem({
					name: 'Stinger GT',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c5/StingerGT-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160606121633',
					model: 'stingergt',
				}),

				new VehicleListItem({
					name: 'Stirling GT',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d2/StirlingGT-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20150614114322',
					model: 'feltzer3',
					dlc: Dlc.IllGottenGainsPart1,
				}),

				new VehicleListItem({
					name: 'Stromberg',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c4/Stromberg-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218192145',
					model: 'stromberg',
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Swinger',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/f8/Swinger-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180725175156',
					model: 'swinger',
					dlc: Dlc.AfterHours,
				}),

				new VehicleListItem({
					name: 'Torero',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/47/Torero-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170614143234',
					model: 'torero',
					dlc: Dlc.Gunrunning,
				}),

				new VehicleListItem({
					name: 'Tornado',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/2f/Tornado-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20180331183746',
					model: 'tornado',
				}),

				new VehicleListItem({
					name: 'Tornado (Convertible)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/86/Tornado2Down-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20180331183741',
					model: 'tornado2',
				}),

				new VehicleListItem({
					name: 'Tornado (Beater)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/74/Tornado3-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20180331183744',
					model: 'tornado3',
				}),

				new VehicleListItem({
					name: 'Tornado (Mariachi)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/66/Tornado4-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160318213005',
					model: 'tornado4',
				}),

				new VehicleListItem({
					name: 'Tornado Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/69/TornadoCustomUp-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160316181637',
					model: 'tornado5',
					dlc: Dlc.LowridersCustomClassics,
				}),

				new VehicleListItem({
					name: 'Tornado Rat Rod',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/79/TornadoRatRod-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014164052',
					model: 'tornado6',
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'Turismo Classic',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/9a/TurismoClassic-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170314170520',
					model: 'turismo2',
					dlc: Dlc.CunningStuntsSpecialVehicleCircuit,
				}),

				new VehicleListItem({
					name: 'Viseris',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b2/Viseris-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218193459',
					model: 'viseris',
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Z-Type',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/9d/Z-Type-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160917231447',
					model: 'ztype',
				}),
			]),
		);
	}

	private initialiseSportsClassics() {
		this.vehicles.push(
			...this.addClass(VehicleClass.SportsClassics, [
				new VehicleListItem({
					name: '9F',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/2d/9F-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20150529201705',
					model: 'ninef',
				}),

				new VehicleListItem({
					name: '9F Cabrio',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a1/9FCabrio-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20150529201708',
					model: 'ninef2',
				}),

				new VehicleListItem({
					name: 'Alpha',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/94/Alpha-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160917231444',
					model: 'alpha',
					dlc: Dlc.TheBusinessUpdate,
				}),

				new VehicleListItem({
					name: 'ZR380 (Apocalypse)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/20/ApocalypseZR380-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181214201711',
					model: 'zr380',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'ZR380 (Future Shock)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/9e/FutureShockZR380-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181214201713',
					model: 'zr3802',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'ZR380 (Nightmare)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/06/NightmareZR380-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181214201719',
					model: 'zr3803',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Banshee',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/82/Banshee-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160929173524',
					model: 'banshee',
				}),

				new VehicleListItem({
					name: 'Bestia GTS',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a5/BestiaGTS-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014162647',
					model: 'bestiagts',
					dlc: Dlc.FurtherAdventuresinFinanceandFelony,
				}),

				new VehicleListItem({
					name: 'Blista Compact',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/06/BlistaCompact-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160929162026',
					model: 'blista2',
				}),

				new VehicleListItem({
					name: 'Blista Compact (Go Go Monkey)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/76/GoGoMonkeyBlista-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160929162113',
					model: 'blista3',
				}),

				new VehicleListItem({
					name: 'Buffalo',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/7d/Buffalo-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20180331183432',
					model: 'buffalo',
				}),

				new VehicleListItem({
					name: 'Buffalo S',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/e1/BuffaloS-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20150531171438',
					model: 'buffalo2',
				}),

				new VehicleListItem({
					name: 'Buffalo Sprunk',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/34/SprunkBuffalo-GTAVPC-front.png/revision/latest/scale-to-width-down/350?cb=20150529175841',
					model: 'buffalo3',
					dlc: Dlc.CunningStunts,
				}),

				new VehicleListItem({
					name: 'Carbonizzare',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/7b/CarbonizzareDown-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160917231442',
					model: 'carbonizzare',
				}),

				new VehicleListItem({
					name: 'Comet',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d2/Comet-GTAV-front.png/revision/latest?cb=20160702195302',
					model: 'comet2',
				}),

				new VehicleListItem({
					name: 'Comet Retro Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a0/CometRetroCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161213201950',
					model: 'comet3',
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'Comet Safari',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/aa/CometSafari-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218202452',
					model: 'comet4',
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Comet SR',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/0f/CometSR-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218193000',
					model: 'comet5',
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Coquette',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/08/Coquette-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160429175114',
					model: 'coquette',
				}),

				new VehicleListItem({
					name: 'Drift Tampa',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/51/DriftTampa-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160712123654',
					model: 'tampa2',
					dlc: Dlc.CunningStunts,
				}),

				new VehicleListItem({
					name: 'Elegy RH8',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/4f/ElegyRH8-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160525194616',
					model: 'elegy2',
				}),

				new VehicleListItem({
					name: 'Elegy Retro Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/68/ElegyRetroCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161213202302',
					model: 'elegy',
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'Feltzer',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/8f/Feltzer-GTAVPC-Front.png/revision/latest/scale-to-width-down/350?cb=20150718115304',
					model: 'feltzer2',
				}),

				new VehicleListItem({
					name: 'Flash GT',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/3b/FlashGT-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180901173617',
					model: 'flashgt',
					dlc: Dlc.SouthernSanAndreasSuperSportSeries,
				}),

				new VehicleListItem({
					name: 'Furore GT',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/56/FuroreGT-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160302175246',
					model: 'furoregt',
					dlc: Dlc.LastTeamStandingUpdate,
				}),

				new VehicleListItem({
					name: 'Fusilade',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a0/Fusilade-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160409171753',
					model: 'fusilade',
				}),

				new VehicleListItem({
					name: 'Futo',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/67/Futo-GTAV-front.PNG/revision/latest/scale-to-width-down/350?cb=20180726155611',
					model: 'futo',
				}),

				new VehicleListItem({
					name: 'GB200',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/36/GB200-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180329205448',
					model: 'gb200',
					dlc: Dlc.SouthernSanAndreasSuperSportSeries,
				}),

				new VehicleListItem({
					name: 'Hotring Sabre',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/8f/HotringSabre-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180325152713',
					model: 'hotring',
					dlc: Dlc.SouthernSanAndreasSuperSportSeries,
				}),

				new VehicleListItem({
					name: 'Itali GTO',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/ec/ItaliGTO-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181214181625',
					model: 'italigto',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Jester',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/af/Jester-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160917231438',
					model: 'jester',
					dlc: Dlc.TheBusinessUpdate,
				}),

				new VehicleListItem({
					name: 'Jester Classic',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/1a/JesterClassic-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20190121092851',
					model: 'jester3',
					dlc: Dlc.AfterHours,
				}),

				new VehicleListItem({
					name: 'Jester (Racecar)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/fd/Jester%28Racecar%29-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161111195702',
					model: 'jester2',
					dlc: Dlc.FestiveSurprise,
				}),

				new VehicleListItem({
					name: 'Khamelion',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/1f/Khamelion-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160917231447',
					model: 'khamelion',
				}),

				new VehicleListItem({
					name: 'Kuruma',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/53/Kuruma-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160501145849',
					model: 'kuruma',
					dlc: Dlc.HeistsUpdate,
				}),

				new VehicleListItem({
					name: 'Kuruma (Armoured)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/97/ArmoredKuruma-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20151212172101',
					model: 'kuruma2',
					dlc: Dlc.HeistsUpdate,
				}),

				new VehicleListItem({
					name: 'Lynx',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a7/Lynx-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160712123941',
					model: 'lynx',
					dlc: Dlc.CunningStunts,
				}),

				new VehicleListItem({
					name: 'Massacro',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/12/Massacro-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20180331183607',
					model: 'massacro',
					dlc: Dlc.HighLifeUpdate,
				}),

				new VehicleListItem({
					name: 'Massacro (Racecar)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d0/Massacro%28Racecar%29-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20180331183605',
					model: 'massacro2',
					dlc: Dlc.FestiveSurprise,
				}),

				new VehicleListItem({
					name: 'Neon',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c0/Neon-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171220191339',
					model: 'neon',
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Omnis',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/e7/Omnis-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160712122549',
					model: 'omnis',
					dlc: Dlc.CunningStunts,
				}),

				new VehicleListItem({
					name: 'Pariah',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/ff/Pariah-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218203236',
					model: 'pariah',
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Penumra',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/cc/Penumbra-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20171024163859',
					model: 'penumbra',
				}),

				new VehicleListItem({
					name: 'Raiden',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b5/Raiden-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218192549',
					model: 'raiden',
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Rapid GT',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/42/RapidGT-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20150529203102',
					model: 'rapidgt',
				}),

				new VehicleListItem({
					name: 'Rapid GT (Convertible)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/f8/RapidGT2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20150529203104',
					model: 'rapidgt2',
				}),

				new VehicleListItem({
					name: 'Raptor',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/cc/Raptor-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161004180544',
					model: 'raptor',
					tags: ['fun'],
					dlc: Dlc.Bikers,
				}),

				new VehicleListItem({
					name: 'Revolter',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/e8/Revolter-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218203456',
					model: 'revolter',
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Ruston',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/2c/Ruston-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170314170818',
					model: 'ruston',
					dlc: Dlc.CunningStuntsSpecialVehicleCircuit,
				}),

				new VehicleListItem({
					name: 'Seven-70',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/21/Seven70-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014163258',
					model: 'seven70',
					dlc: Dlc.FurtherAdventuresinFinanceandFelony,
				}),

				new VehicleListItem({
					name: 'Schafter LWB',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/22/SchafterLWB-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20151216172307',
					model: 'schafter4',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Schafter V12',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a6/SchafterV12-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20151216172122',
					model: 'schafter3',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Schlagen GT',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/42/SchlagenGT-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20190107163325',
					model: 'schlagen',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'Schwartzer',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/ff/Schwartzer-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160929173528',
					model: 'schwarzer',
				}),

				new VehicleListItem({
					name: 'Sentinel Classic',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/dc/SentinelClassic-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218204330',
					model: 'sentinel3',
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Specter',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/7b/Specter-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161213202907',
					model: 'specter',
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'Specter Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/01/SpecterCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161213202941',
					model: 'specter2',
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'Streiter',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/38/Streiter-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218193930',
					model: 'streiter',
					dlc: Dlc.TheDoomsdayHeist,
				}),

				new VehicleListItem({
					name: 'Sultan',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/bb/Sultan-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20180331183641',
					model: 'sultan',
				}),

				new VehicleListItem({
					name: 'Surano',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/fd/SuranoDown-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160305181513',
					model: 'surano',
				}),

				new VehicleListItem({
					name: 'Tropos Rallye',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/df/TroposRallye-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014163622',
					model: 'tropos',
					dlc: Dlc.CunningStunts,
				}),

				new VehicleListItem({
					name: 'Verlierer',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/8c/Verlierer-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180331183730',
					model: 'verlierer2',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),
			]),
		);
	}

	private initialiseSuper() {
		this.vehicles.push(
			...this.addClass(VehicleClass.Super, [
				new VehicleListItem({
					name: '811',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c7/811A-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014163127',
					model: 'pfister811',
					dlc: Dlc.FurtherAdventuresinFinanceandFelony,
				}),

				new VehicleListItem({
					name: 'Adder',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/9e/Adder-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20190106193205',
					model: 'adder',
				}),

				new VehicleListItem({
					name: 'Banshee 900R',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/0b/Banshee900R-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180513190135',
					model: 'banshee2',
					dlc: Dlc.January2016Update,
				}),

				new VehicleListItem({
					name: 'Bullet',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/3d/Bullet-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20180331183434',
					model: 'bullet',
				}),

				new VehicleListItem({
					name: 'Cheetah',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/1e/Cheetah-GTAV-Front.png/revision/latest/scale-to-width-down/350?cb=20180331183553',
					model: 'cheetah',
				}),

				new VehicleListItem({
					name: 'Cyclone',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/07/Cyclone-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180331183602',
					model: 'cyclone',
					dlc: Dlc.SmugglersRun,
				}),

				new VehicleListItem({
					name: 'Deveste Eight',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/7b/Deveste-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181214181626',
					model: 'deveste',
				}),

				new VehicleListItem({
					name: 'Entity XF',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/95/EntityXF-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161111225624',
					model: 'entityxf',
				}),

				new VehicleListItem({
					name: 'Entity XXR',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/9a/EntityXXR-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180325152709',
					model: 'entity2',
					dlc: Dlc.SouthernSanAndreasSuperSportSeries,
				}),

				new VehicleListItem({
					name: 'ETR-1',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/76/ETR1-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160712123550',
					model: 'sheava',
					dlc: Dlc.CunningStunts,
				}),

				new VehicleListItem({
					name: 'FMJ',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/8c/FMJ-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014163347',
					model: 'fmj',
					dlc: Dlc.FurtherAdventuresinFinanceandFelony,
				}),

				new VehicleListItem({
					name: 'GP1',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/8a/GP1-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170314170715',
					model: 'gp1',
					dlc: Dlc.CunningStuntsSpecialVehicleCircuit,
				}),

				new VehicleListItem({
					name: 'Infernus',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/0e/Infernus-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160429175116',
					model: 'infernus',
				}),

				new VehicleListItem({
					name: 'Itali GTB',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/44/ItaliGTB-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171103095537',
					model: 'italigtb',
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'Itali GTB Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c5/ItaliGTBCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161213202528',
					model: 'italigtb2',
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'Nero',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/5e/Nero-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161213202624',
					model: 'nero',
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'Nero Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/40/NeroCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180331183629',
					model: 'nero2',
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'Osiris',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/53/Osiris-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20150614104749',
					model: 'osiris',
					dlc: Dlc.IllGottenGainsPart1,
				}),

				new VehicleListItem({
					name: 'Penetrator',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/9c/Penetrator-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161213202741',
					model: 'penetrator',
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'RE-7B',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/77/RE7B-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160712123452',
					model: 'le7b',
					dlc: Dlc.CunningStunts,
				}),

				new VehicleListItem({
					name: 'Reaper',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/5f/Reaper-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180331183637',
					model: 'reaper',
				}),

				new VehicleListItem({
					name: 'SC1',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/3a/SC1-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171218192734',
					model: 'sc1',
				}),

				new VehicleListItem({
					name: 'Scramjet',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/3a/Scramjet-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180725181214',
					model: 'scramjet',
					tags: ['fun'],
					dlc: Dlc.AfterHours,
				}),

				new VehicleListItem({
					name: 'Sultan RS',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c1/SultanRS-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160128182129',
					model: 'sultanrs',
					dlc: Dlc.January2016Update,
				}),

				new VehicleListItem({
					name: 'T20',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/20/T20-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20180331183732',
					model: 't20',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Taipan',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/4c/Taipan-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180328210610',
					model: 'taipan',
					dlc: Dlc.SouthernSanAndreasSuperSportSeries,
				}),

				new VehicleListItem({
					name: 'Tempesta',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/35/Tempesta-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161213203018',
					model: 'tempesta',
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'Tezeract',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/ca/Tezeract-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180331183737',
					model: 'tezeract',
					dlc: Dlc.SouthernSanAndreasSuperSportSeries,
				}),

				new VehicleListItem({
					name: 'Turismo R',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/61/TurismoR-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161111200407',
					model: 'turismor',
					dlc: Dlc.TheBusinessUpdate,
				}),

				new VehicleListItem({
					name: 'Tyrant',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/f7/Tyrant-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20190106193204',
					model: 'tyrant',
					dlc: Dlc.SouthernSanAndreasSuperSportSeries,
				}),

				new VehicleListItem({
					name: 'Tyrus',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/8f/Tyrus-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160712122822',
					model: 'tyrus',
					dlc: Dlc.CunningStunts,
				}),

				new VehicleListItem({
					name: 'Vacca',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b4/Vacca-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20180331183726',
					model: 'vacca',
				}),

				new VehicleListItem({
					name: 'Vagner',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/14/Vagner-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20171220190908',
					model: 'vagner',
					dlc: Dlc.Gunrunning,
				}),

				new VehicleListItem({
					name: 'Vigilante',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/ec/Vigilante-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180331183732',
					model: 'vigilante',
					tags: ['fun'],
					dlc: Dlc.SmugglersRun,
				}),

				new VehicleListItem({
					name: 'Visione',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/5/57/Visione-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170916171115',
					model: 'visione',
					dlc: Dlc.SmugglersRun,
				}),

				new VehicleListItem({
					name: 'Voltic',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/87/Voltic-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161111200411',
					model: 'voltic',
				}),

				new VehicleListItem({
					name: 'Voltic (Rocket)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/95/RocketVoltic-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161213203222',
					model: 'voltic2',
					tags: ['fun'],
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'X80 Proto',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b3/X80Proto-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160609144552',
					model: 'prototipo',
					dlc: Dlc.FurtherAdventuresinFinanceandFelony,
				}),

				new VehicleListItem({
					name: 'XA-21',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/69/XA21-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170614143529',
					model: 'xa21',
					dlc: Dlc.Gunrunning,
				}),

				new VehicleListItem({
					name: 'Zentorno',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/60/Zentorno-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160302171211',
					model: 'zentorno',
					dlc: Dlc.HighLifeUpdate,
				}),
			]),
		);
	}

	private initialiseSUVs() {
		this.vehicles.push(
			...this.addClass(VehicleClass.SUVs, [
				new VehicleListItem({
					name: 'Baller',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/ef/Baller2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160929171011',
					model: 'baller2',
				}),

				new VehicleListItem({
					name: 'Baller LE',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/71/BallerLE-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160117194728',
					model: 'baller3',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Baller LE (Armoured)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/6c/BallerLEArmored-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160117194741',
					model: 'baller5',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Baller LE LWB',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/3c/BallerLELWB-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160117194751',
					model: 'baller4',
					dlc: Dlc.ExecutivesandOtherCriminals,
				}),

				new VehicleListItem({
					name: 'Baller LE LWB (Armoured)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/7d/BallerLELWBArmored-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160117194801',
					model: 'baller6',
				}),

				new VehicleListItem({
					name: 'BeeJay XL',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/da/BeeJayXL-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160929171015',
					model: 'bjxl',
				}),

				new VehicleListItem({
					name: 'Cavalcade',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c5/Cavalcade-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161111195103',
					model: 'cavalcade',
				}),

				new VehicleListItem({
					name: 'Cavalcade (Variant)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/08/Cavalcade2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160304225018',
					model: 'cavalcade2',
				}),

				new VehicleListItem({
					name: 'Contender',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c6/Contender-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160712124055',
					model: 'contender',
					dlc: Dlc.CunningStunts,
				}),

				new VehicleListItem({
					name: 'Dubsta',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c0/Dubsta-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160409171730',
					model: 'dubsta',
				}),

				new VehicleListItem({
					name: 'Dubsta (Variant)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/fa/Dubsta2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160318211333',
					model: 'dubsta2',
				}),

				new VehicleListItem({
					name: 'FQ 2',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/6e/FQ2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160305185537',
					model: 'fq2',
				}),

				new VehicleListItem({
					name: 'Granger',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/de/Granger-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160626144333',
					model: 'granger',
				}),

				new VehicleListItem({
					name: 'Gresley',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/ff/Gresley-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160308180844',
					model: 'gresley',
				}),

				new VehicleListItem({
					name: 'Habanero',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/c/c9/Habanero-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160125183045',
					model: 'habanero',
				}),

				new VehicleListItem({
					name: 'Huntley S',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/2f/HuntleyS-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160125184521',
					model: 'huntley',
					dlc: Dlc.HighLifeUpdate,
				}),

				new VehicleListItem({
					name: 'Landstalker',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/77/Landstalker-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160406180655',
					model: 'landstalker',
				}),

				new VehicleListItem({
					name: 'Mesa',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/97/Mesa-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160626145559',
					model: 'mesa',
				}),

				new VehicleListItem({
					name: 'Mesa (Snow-covered)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/ac/Mesa2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160916164929',
					model: 'mesa2',
				}),

				new VehicleListItem({
					name: 'Mesa (Merryweather)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/fd/Mesa3-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160929163600',
					model: 'mesa3',
				}),

				new VehicleListItem({
					name: 'Patriot',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/90/Patriot-GTAV-front.PNG/revision/latest/scale-to-width-down/350?cb=20181011083156',
					model: 'patriot',
				}),

				new VehicleListItem({
					name: 'Patriot Stretch',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/4b/PatriotStretch-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180725175620',
					model: 'patriot2',
					dlc: Dlc.AfterHours,
				}),

				new VehicleListItem({
					name: 'Radius',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b6/Radius-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160409181754',
					model: 'radi',
				}),

				new VehicleListItem({
					name: 'Rocoto',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/28/Rocoto-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160213013426',
					model: 'rocoto',
				}),

				new VehicleListItem({
					name: 'Seminole',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a0/Seminole-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160211192105',
					model: 'seminole',
				}),

				new VehicleListItem({
					name: 'Serrano',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/3d/Serrano-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160409182018',
					model: 'serrano',
				}),

				new VehicleListItem({
					name: 'Toros',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d3/Toros-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20181214174204',
					model: 'toros',
					dlc: Dlc.ArenaWar,
				}),

				new VehicleListItem({
					name: 'XLS',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/8c/XLS-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014164212',
					model: 'xls',
					dlc: Dlc.FurtherAdventuresinFinanceandFelony,
				}),

				new VehicleListItem({
					name: 'XLS (Armoured)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/e3/XLSArmored-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160609145239',
					model: 'xls2',
					dlc: Dlc.FurtherAdventuresinFinanceandFelony,
				}),
			]),
		);
	}

	private initialiseUtility() {
		this.vehicles.push(
			...this.addClass(VehicleClass.Utility, [
				new VehicleListItem({
					name: 'Airtug',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/f9/Airtug-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018175626',
					model: 'airtug',
				}),

				new VehicleListItem({
					name: 'Caddy',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/0e/Caddy-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018175900',
					model: 'caddy',
					tags: ['fun'],
					dlc: Dlc.Gunrunning,
				}),

				new VehicleListItem({
					name: 'Caddy (Citizen)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/05/Caddy2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160626144109',
					model: 'caddy2',
				}),

				new VehicleListItem({
					name: 'Caddy (Bunker)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/4f/Caddy3-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20170614143908',
					model: 'caddy3',
				}),

				new VehicleListItem({
					name: 'Docktug',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/f4/Docktug-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018180059',
					model: 'docktug',
				}),

				new VehicleListItem({
					name: 'Fieldmaster',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/11/Fieldmaster-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160626144225',
					model: 'tractor2',
				}),

				new VehicleListItem({
					name: 'Fieldmaster (Snow-Covered)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/f8/Fieldmaster2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160916164933',
					model: 'tractor3',
				}),

				new VehicleListItem({
					name: 'Forklift',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/9/97/Forklift-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160702195405',
					model: 'forklift',
				}),

				new VehicleListItem({
					name: 'Lawnmower',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/20/LawnMower-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018180609',
					model: 'mower',
					tags: ['fun'],
				}),

				new VehicleListItem({
					name: 'Ripley',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/08/Ripley-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018180754',
					model: 'ripley',
				}),

				new VehicleListItem({
					name: 'Sadler',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/07/Sadler-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018180756',
					model: 'sadler',
				}),

				new VehicleListItem({
					name: 'Sadler (Snow-Covered)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/e2/Sadler2-GTAV-front.png/revision/latest/scale-to-width-down/270?cb=20160916164931',
					model: 'sadler2',
				}),

				new VehicleListItem({
					name: 'Scrap Truck',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/3a/ScrapTruck-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160520164314',
					model: 'scrap',
				}),

				new VehicleListItem({
					name: 'Towtruck',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/24/Towtruck2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160625224220',
					model: 'towtruck',
				}),

				new VehicleListItem({
					name: 'Towtruck (Variant)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/be/Towtruck-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160702195216',
					model: 'towtruck2',
				}),

				new VehicleListItem({
					name: 'Tractor',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/f4/Tractor-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018181109',
					model: 'tractor',
				}),

				new VehicleListItem({
					name: 'Utility Truck (Crane)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/4d/UtilityTruckCrane-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160626153900',
					model: 'utillitruck',
				}),

				new VehicleListItem({
					name: 'Utility Truck (Box)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/2d/UtilityTruck2Box-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160626153858',
					model: 'utillitruck2',
				}),

				new VehicleListItem({
					name: 'Utility Truck (Pickup)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/10/UtilityTruck3-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160626155333',
					model: 'utillitruck3',
				}),
			]),
		);
	}

	private initialiseVans() {
		this.vehicles.push(
			...this.addClass(VehicleClass.Vans, [
				new VehicleListItem({
					name: 'Bison',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/69/Bison-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160406172803',
					model: 'bison',
				}),

				new VehicleListItem({
					name: 'Bison (McGill-Olsen)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/24/Bison2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018175636',
					model: 'bison2',
				}),

				new VehicleListItem({
					name: 'Bison (Mighty Bush)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d9/Bison3-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160406172900',
					model: 'bison3',
				}),

				new VehicleListItem({
					name: 'Bobcat XL',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/37/BobcatXL-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161019154520',
					model: 'bobcatxl',
				}),

				new VehicleListItem({
					name: 'Boxville (LSWP)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/01/LSDWPBoxville-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20180512151841',
					model: 'boxville',
				}),

				new VehicleListItem({
					name: 'Boxville (Go Postal)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/2/2d/Boxville2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20180512151838',
					model: 'boxville2',
				}),

				new VehicleListItem({
					name: 'Boxville (Humane Labs)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a5/Boxville3-GTAV-FrontQuarter.jpg/revision/latest/scale-to-width-down/350?cb=20180512151410',
					model: 'boxville3',
				}),

				new VehicleListItem({
					name: 'Boxville (Post OP)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a5/Boxville3-GTAV-FrontQuarter.jpg/revision/latest/scale-to-width-down/350?cb=20180512151410',
					model: 'boxville4',
					dlc: Dlc.HeistsUpdate,
				}),

				new VehicleListItem({
					name: 'Boxville (Armoured)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/6/6c/ArmoredBoxville-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161213201707',
					model: 'boxville5',
					tags: ['fun'],
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'Taco Van',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/37/TacoVan-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20180513190133',
					model: 'taco',
					tags: ['fun'],
				}),

				new VehicleListItem({
					name: 'Burrito',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/33/LSWPBurrito-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160929164147',
					model: 'burrito',
				}),

				new VehicleListItem({
					name: 'Burrito (Bugstars)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/00/Burrito2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160929164142',
					model: 'burrito2',
				}),

				new VehicleListItem({
					name: 'Burrito (Civilian)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/80/Burrito3-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160929164143',
					model: 'burrito3',
				}),

				new VehicleListItem({
					name: 'Gang Burrito',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d0/GangBurrito-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160311205524',
					model: 'gburrito',
				}),

				new VehicleListItem({
					name: 'Gang Burrito (Gangless)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/4f/GangBurrito2-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160117194400',
					model: 'gburrito2',
					dlc: Dlc.ImportExport,
				}),

				new VehicleListItem({
					name: 'Camper',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/0b/Camper-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161018175917',
					model: 'camper',
				}),

				new VehicleListItem({
					name: 'Journey',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/8/8d/Journey-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160626144337',
					model: 'journey',
				}),

				new VehicleListItem({
					name: 'Minivan',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/16/Minivan-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160304223738',
					model: 'minivan',
				}),

				new VehicleListItem({
					name: 'Minivan Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/ff/MinivanCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20160316181614',
					model: 'minivan2',
					dlc: Dlc.LowridersCustomClassics,
				}),

				new VehicleListItem({
					name: 'Pony',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/e/e9/SunsetBleachPony-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20180608153229',
					model: 'pony',
				}),

				new VehicleListItem({
					name: 'Pony (Smoke on the Water)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/4/40/Pony2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20161111195822',
					model: 'pony2',
				}),

				new VehicleListItem({
					name: 'Rumpo',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d3/Rumpo-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160606122422',
					model: 'rumpo',
				}),

				new VehicleListItem({
					name: 'Rumpo (Deludamol)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/1/10/Rumpo2-GTAV-FrontQuarter.png/revision/latest/scale-to-width-down/350?cb=20180609112615',
					model: 'rumpo2',
				}),

				new VehicleListItem({
					name: 'Rumpo Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/7/7b/RumpoCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014163518',
					model: 'rumpo3',
					dlc: Dlc.FurtherAdventuresinFinanceandFelony,
				}),

				new VehicleListItem({
					name: 'Paradise',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/d6/Paradise-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160302170024',
					model: 'paradise',
					dlc: Dlc.BeachBumContentUpdate,
				}),

				new VehicleListItem({
					name: 'Speedo',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/f/fd/Speedo-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160626150713',
					model: 'speedo',
				}),

				new VehicleListItem({
					name: 'Clown Van',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/0/0d/ClownVan-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20151222204023',
					model: 'speedo2',
				}),

				new VehicleListItem({
					name: 'Speedo Custom',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/3/35/SpeedoCustom-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20180725175930',
					model: 'speedo4',
				}),

				new VehicleListItem({
					name: 'Surfer',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/ac/Surfer-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160409182213',
					model: 'surfer',
				}),

				new VehicleListItem({
					name: 'Surfer (Beater)',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/a/a6/Surfer2-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160626153853',
					model: 'surfer2',
				}),

				new VehicleListItem({
					name: 'Youga',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/d/dc/Youga-GTAV-front.png/revision/latest/scale-to-width-down/350?cb=20160414212010',
					model: 'youga',
				}),

				new VehicleListItem({
					name: 'Youga Classic',
					image:
						'https://vignette.wikia.nocookie.net/gtawiki/images/b/b7/YougaClassic-GTAO-front.png/revision/latest/scale-to-width-down/350?cb=20161014164331',
					model: 'youga2',
					dlc: Dlc.Bikers,
				}),
			]),
		);
	}
}

let vehicleList: VehicleList;

export function getVehicles(): VehicleList {
	if (!vehicleList) {
		vehicleList = new VehicleList();
	}

	return vehicleList;
}
