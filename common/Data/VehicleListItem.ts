import { Dlc } from './Dlc';
import type { VehicleClass } from './ParamEnums';

type VehicleListItemArgs = {
	name: string;
	model: string;
	vehicleClass?: VehicleClass;
	image?: string;
	tags?: string[];
	dlc?: Dlc;
};

export default class VehicleListItem {
	name: string;
	image: string;
	model: string;
	tags: string[] = [];
	vehicleClass: VehicleClass;
	dlc: Dlc = Dlc.BaseGame;
	private hash: number;

	constructor({
		name,
		model,
		vehicleClass = null,
		image = undefined,
		tags = [],
		dlc = Dlc.BaseGame,
	}: VehicleListItemArgs) {
		this.name = name;
		this.image = image;
		this.model = model;
		this.tags = tags ?? [];
		this.vehicleClass = vehicleClass;
		this.dlc = dlc ?? Dlc.BaseGame;
	}

	get modelhash() {
		if (!this.hash) {
			this.hash = GetHashKey(this.model);
		}

		return this.hash;
	}

	hasTag(tag: string): boolean {
		return this.tags.includes(tag);
	}

	matchesSearchTerm(term: string) {
		const normalTerm = term.replaceAll(/\s+/g, '').toLocaleLowerCase();

		return (
			this.model.toLocaleLowerCase().includes(normalTerm) ||
			this.name.replaceAll(/\s+/g, '').toLocaleLowerCase().includes(normalTerm)
		);
	}
}
