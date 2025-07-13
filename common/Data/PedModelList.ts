import type { Model } from '../utils';
import PedModelListItem from './PedModelListItem';

export enum PedModelType {
	Human = 0,
	Animal = 1,
	MainCharacter = 2,
	Custom = 3,
}

// biome-ignore lint/complexity/noStaticOnlyClass: this would be a mess if it wasn't a class
export default class PedModelList {
	static initialised = false;
	static models: PedModelListItem[];
	static modelHashCache: Map<number, PedModelListItem> = new Map();

	static getByType(type: PedModelType) {
		PedModelList.initialise();

		return PedModelList.models
			.filter((x) => x.type === type)
			.sort((a, b) => a.name.localeCompare(b.name));
	}

	static getByHash(hash: Model) {
		if (typeof hash === 'string') {
			hash = Number.parseInt(hash, 10);
		}

		if (!PedModelList.modelHashCache.has(hash)) {
			const model: PedModelListItem = PedModelList.models.find(
				(m) => m.modelHash === hash,
			);
			PedModelList.modelHashCache.set(hash, model);
		}

		return PedModelList.modelHashCache.get(hash);
	}

	static initialise() {
		if (PedModelList.initialised) {
			return;
		}

		PedModelList.models = [
			// Animals
			Object.assign(new PedModelListItem(), {
				name: 'Boar',
				model: 'A_C_Boar',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Cat',
				model: 'A_C_Cat_01',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Chickenhawk (Can crash game)',
				model: 'A_C_Chickenhawk',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Chimp',
				model: 'A_C_Chimp',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Chop',
				model: 'a_c_chop',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Cormorant',
				model: 'A_C_Cormorant',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Cow',
				model: 'A_C_Cow',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Coyote',
				model: 'A_C_Coyote',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Crow',
				model: 'A_C_Crow',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Deer',
				model: 'A_C_Deer',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Dolphin',
				model: 'A_C_Dolphin',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Fish',
				model: 'A_C_Fish',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'German Shepherd',
				model: 'A_C_shepherd',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hen',
				model: 'A_C_Hen',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hammerhead Shark',
				model: 'A_C_SharkHammer',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Humpback Whale',
				model: 'A_C_HumpBack',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Husky',
				model: 'A_C_Husky',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Killer Whale',
				model: 'A_C_KillerWhale',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mountain Lion',
				model: 'A_C_MtLion',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Pig',
				model: 'A_C_Pig',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Poodle',
				model: 'A_C_Poodle',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Pug',
				model: 'A_C_Pug',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Pigeon',
				model: 'A_C_Pigeon',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Rabbit',
				model: 'a_c_rabbit_01',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Rat (Can crash game)',
				model: 'A_C_Rat',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Retriever',
				model: 'a_c_retriever',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Rhesus Macaque',
				model: 'a_c_rhesus',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Rottweiler',
				model: 'a_c_rottweiler',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Seagull',
				model: 'A_C_Seagull',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Stingray',
				model: 'A_C_Stingray',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tiger Shark',
				model: 'A_C_SharkTiger',
				type: PedModelType.Animal,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Westy',
				model: 'a_c_westy',
				type: PedModelType.Animal,
			}),

			// Humans
			Object.assign(new PedModelListItem(), {
				name: 'Abigail Mathers (CS)',
				model: 'csb_abigail',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Abigail Mathers (IG)',
				model: 'ig_abigail',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Abner',
				model: 'u_m_y_abner',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'African American Male',
				model: 'a_m_m_afriamer_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Agent (CS)',
				model: 'csb_agent',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Agent (IG)',
				model: 'ig_agent',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Agent 14 (CS)',
				model: 'csb_mp_agent14',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Agent 14 (IG)',
				model: 'ig_mp_agent14',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Air Hostess',
				model: 's_f_y_airhostess_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Air Worker Male',
				model: 's_m_y_airworker',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Al Di Napoli Male',
				model: 'u_m_m_aldinapoli',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Alien',
				model: 's_m_m_movalien_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Altruist Cult Mid-Age Male',
				model: 'a_m_m_acult_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Altruist Cult Old Male',
				model: 'a_m_o_acult_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Altruist Cult Old Male 2',
				model: 'a_m_o_acult_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Altruist Cult Young Male',
				model: 'a_m_y_acult_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Altruist Cult Young Male 2',
				model: 'a_m_y_acult_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Amanda De Santa (CS)',
				model: 'cs_amandatownley',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Amanda De Santa (IG)',
				model: 'ig_amandatownley',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Ammu-Nation City Clerk',
				model: 's_m_y_ammucity_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Ammu-Nation Rural Clerk',
				model: 's_m_m_ammucountry',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Andreas Sanchez (CS)',
				model: 'cs_andreas',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Andreas Sanchez (IG)',
				model: 'ig_andreas',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Anita Mendoza',
				model: 'csb_anita',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Anton Beaudelaire',
				model: 'csb_anton',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Anton Beaudelaire',
				model: 'u_m_y_antonb',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Armenian Boss',
				model: 'g_m_m_armboss_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Armenian Goon',
				model: 'g_m_m_armgoon_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Armenian Goon 2',
				model: 'g_m_y_armgoon_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Armenian Lieutenant',
				model: 'g_m_m_armlieut_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Armoured Van Security',
				model: 'mp_s_m_armoured_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Armoured Van Security',
				model: 's_m_m_armoured_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Armoured Van Security 2',
				model: 's_m_m_armoured_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Army Mechanic',
				model: 's_m_y_armymech_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Ashley Butler (CS)',
				model: 'cs_ashley',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Ashley Butler (IG)',
				model: 'ig_ashley',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Autopsy Tech',
				model: 's_m_y_autopsy_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Autoshop Worker',
				model: 's_m_m_autoshop_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Autoshop Worker 2',
				model: 's_m_m_autoshop_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Azteca',
				model: 'g_m_y_azteca_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Baby D',
				model: 'u_m_y_babyd',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Ballas East Male',
				model: 'g_m_y_ballaeast_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Ballas Female',
				model: 'g_f_y_ballas_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Ballas OG',
				model: 'csb_ballasog',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Ballas OG (IG)',
				model: 'ig_ballasog',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Ballas Original Male (IG)',
				model: 'g_m_y_ballaorig_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Ballas South Male',
				model: 'g_m_y_ballasout_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Bank Manager (CS)',
				model: 'cs_bankman',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Bank Manager (IG)',
				model: 'ig_bankman',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Bank Manager Male',
				model: 'u_m_m_bankman',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Barber Female',
				model: 's_f_m_fembarber',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Barman',
				model: 's_m_y_barman_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Barry (CS)',
				model: 'cs_barry',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Barry (IG)',
				model: 'ig_barry',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Bartender',
				model: 's_f_y_bartender_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Bartender (Rural)',
				model: 's_m_m_cntrybar_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Baywatch Female',
				model: 's_f_y_baywatch_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Baywatch Male',
				model: 's_m_y_baywatch_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beach Female',
				model: 'a_f_m_beach_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beach Male',
				model: 'a_m_m_beach_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beach Male 2',
				model: 'a_m_m_beach_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beach Muscle Male',
				model: 'a_m_y_musclbeac_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beach Muscle Male 2',
				model: 'a_m_y_musclbeac_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beach Old Male',
				model: 'a_m_o_beach_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beach Tramp Female',
				model: 'a_f_m_trampbeac_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beach Tramp Male',
				model: 'a_m_m_trampbeac_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beach Young Female',
				model: 'a_f_y_beach_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beach Young Male',
				model: 'a_m_y_beach_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beach Young Male 2',
				model: 'a_m_y_beach_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beach Young Male 3',
				model: 'a_m_y_beach_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Benny',
				model: 'ig_benny',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Best Man (IG)',
				model: 'ig_bestmen',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beverly Felton (CS)',
				model: 'cs_beverly',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beverly Felton (IG)',
				model: 'ig_beverly',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beverly Hills Female',
				model: 'a_f_m_bevhills_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beverly Hills Female 2',
				model: 'a_f_m_bevhills_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beverly Hills Male',
				model: 'a_m_m_bevhills_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beverly Hills Male 2',
				model: 'a_m_m_bevhills_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beverly Hills Young Female',
				model: 'a_f_y_bevhills_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beverly Hills Young Female 2',
				model: 'a_f_y_bevhills_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beverly Hills Young Female 3',
				model: 'a_f_y_bevhills_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beverly Hills Young Female 4',
				model: 'a_f_y_bevhills_04',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beverly Hills Young Male',
				model: 'a_m_y_bevhills_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Beverly Hills Young Male 2',
				model: 'a_m_y_bevhills_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Bigfoot (CS)',
				model: 'cs_orleans',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Bigfoot (IG)',
				model: 'ig_orleans',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Bike Hire Guy',
				model: 'u_m_m_bikehire_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Biker Chic Female',
				model: 'u_f_y_bikerchic',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Black Ops Soldier',
				model: 's_m_y_blackops_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Black Ops Soldier 2',
				model: 's_m_y_blackops_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Black Ops Soldier 3',
				model: 's_m_y_blackops_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Black Street Male',
				model: 'a_m_y_stbla_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Black Street Male 2',
				model: 'a_m_y_stbla_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Bodybuilder Female',
				model: 'a_f_m_bodybuild_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Bouncer',
				model: 's_m_m_bouncer_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Brad (CS)',
				model: 'cs_brad',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Brad (IG)',
				model: 'ig_brad',
			}),
			Object.assign(new PedModelListItem(), {
				name: "Brad's Cadaver(CS)",
				model: 'cs_bradcadaver',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Breakdancer Male',
				model: 'a_m_y_breakdance_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Bride',
				model: 'csb_bride',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Bride (IG)',
				model: 'ig_bride',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Burger Drug Worker',
				model: 'csb_burgerdrug',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Burger Drug Worker',
				model: 'u_m_y_burgerdrug_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Busboy',
				model: 's_m_y_busboy_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Business Casual',
				model: 'a_m_y_busicas_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Business Female 2',
				model: 'a_f_m_business_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Business Male',
				model: 'a_m_m_business_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Business Young Female',
				model: 'a_f_y_business_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Business Young Female 2',
				model: 'a_f_y_business_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Business Young Female 3',
				model: 'a_f_y_business_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Business Young Female 4',
				model: 'a_f_y_business_04',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Business Young Male',
				model: 'a_m_y_business_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Business Young Male 2',
				model: 'a_m_y_business_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Business Young Male 3',
				model: 'a_m_y_business_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Busker',
				model: 's_m_o_busker_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Car 3 Guy 1',
				model: 'csb_car3guy1',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Car 3 Guy 1 (IG)',
				model: 'ig_car3guy1',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Car 3 Guy 2',
				model: 'csb_car3guy2',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Car 3 Guy 2 (IG)',
				model: 'ig_car3guy2',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Car Buyer (CS)',
				model: 'cs_carbuyer',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Casey (CS)',
				model: 'cs_casey',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Casey (IG)',
				model: 'ig_casey',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Chef',
				model: 's_m_y_chef_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Chef',
				model: 'csb_chef',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Chef (CS)',
				model: 'csb_chef2',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Chef (IG)',
				model: 'ig_chef',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Chef (IG)',
				model: 'ig_chef2',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Chemical Plant Security',
				model: 's_m_m_chemsec_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Chemical Plant Worker',
				model: 'g_m_m_chemwork_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Chinese Boss',
				model: 'g_m_m_chiboss_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Chinese Goon',
				model: 'g_m_m_chigoon_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Chinese Goon',
				model: 'csb_chin_goon',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Chinese Goon 2',
				model: 'g_m_m_chigoon_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Chinese Goon Older',
				model: 'g_m_m_chicold_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Chip',
				model: 'u_m_y_chip',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Claude Speed',
				model: 'mp_m_claude_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Clay Jackson (The Pain Giver) (IG)',
				model: 'ig_claypain',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Clay Simons (The Lost) (CS)',
				model: 'cs_clay',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Clay Simons (The Lost) (IG)',
				model: 'ig_clay',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Cletus',
				model: 'csb_cletus',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Cletus (IG)',
				model: 'ig_cletus',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Clown',
				model: 's_m_y_clown_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Construction Worker',
				model: 's_m_y_construct_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Construction Worker 2',
				model: 's_m_y_construct_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Cop',
				model: 'csb_cop',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Cop Female',
				model: 's_f_y_cop_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Cop Male',
				model: 's_m_y_cop_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Corpse Female',
				model: 'u_f_m_corpse_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Corpse Young Female',
				model: 'u_f_y_corpse_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Corpse Young Female 2',
				model: 'u_f_y_corpse_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Crew Member',
				model: 's_m_m_ccrew_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Cris Formage (CS)',
				model: 'cs_chrisformage',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Cris Formage (IG)',
				model: 'ig_chrisformage',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Customer',
				model: 'csb_customer',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Cyclist Male',
				model: 'a_m_y_cyclist_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Cyclist Male',
				model: 'u_m_y_cyclist_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Dale (CS)',
				model: 'cs_dale',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Dale (IG)',
				model: 'ig_dale',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Dave Norton (CS)',
				model: 'cs_davenorton',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Dave Norton (IG)',
				model: 'ig_davenorton',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Dead Hooker',
				model: 'mp_f_deadhooker',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Dealer',
				model: 's_m_y_dealer_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Debra (CS)',
				model: 'cs_debra',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Denise (CS)',
				model: 'cs_denise',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Denise (IG)',
				model: 'ig_denise',
			}),
			Object.assign(new PedModelListItem(), {
				name: "Denise's Friend",
				model: 'csb_denise_friend',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Devin (CS)',
				model: 'cs_devin',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Devin (IG)',
				model: 'ig_devin',
			}),
			Object.assign(new PedModelListItem(), {
				name: "Devin's Security",
				model: 's_m_y_devinsec_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Dima Popov (CS)',
				model: 'csb_popov',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Dima Popov (IG)',
				model: 'ig_popov',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'DOA Man',
				model: 'u_m_m_doa_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Dock Worker',
				model: 's_m_m_dockwork_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Dock Worker',
				model: 's_m_y_dockwork_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Doctor',
				model: 's_m_m_doctor_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Dom Beasley (CS)',
				model: 'cs_dom',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Dom Beasley (IG)',
				model: 'ig_dom',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Doorman',
				model: 's_m_y_doorman_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Downhill Cyclist',
				model: 'a_m_y_dhill_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Downtown Female',
				model: 'a_f_m_downtown_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Downtown Male',
				model: 'a_m_y_downtown_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Dr. Friedlander (CS)',
				model: 'cs_drfriedlander',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Dr. Friedlander (IG)',
				model: 'ig_drfriedlander',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Dressy Female',
				model: 'a_f_y_scdressy_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'DW Airport Worker',
				model: 's_m_y_dwservice_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'DW Airport Worker 2',
				model: 's_m_y_dwservice_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'East SA Female',
				model: 'a_f_m_eastsa_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'East SA Female 2',
				model: 'a_f_m_eastsa_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'East SA Male',
				model: 'a_m_m_eastsa_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'East SA Male 2',
				model: 'a_m_m_eastsa_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'East SA Young Female',
				model: 'a_f_y_eastsa_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'East SA Young Female 2',
				model: 'a_f_y_eastsa_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'East SA Young Female 3',
				model: 'a_f_y_eastsa_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'East SA Young Male',
				model: 'a_m_y_eastsa_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'East SA Young Male 2',
				model: 'a_m_y_eastsa_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Ed Toh',
				model: 'u_m_m_edtoh',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Epsilon Female',
				model: 'a_f_y_epsilon_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Epsilon Male',
				model: 'a_m_y_epsilon_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Epsilon Male 2',
				model: 'a_m_y_epsilon_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Epsilon Tom (CS)',
				model: 'cs_tomepsilon',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Epsilon Tom (IG)',
				model: 'ig_tomepsilon',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Ex-Army Male',
				model: 'mp_m_exarmy_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Ex-Mil Bum',
				model: 'u_m_y_militarybum',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Fabien (CS)',
				model: 'cs_fabien',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Fabien (IG)',
				model: 'ig_fabien',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Factory Worker Female',
				model: 's_f_y_factory_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Factory Worker Male',
				model: 's_m_y_factory_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Families CA Male',
				model: 'g_m_y_famca_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Families DD Male',
				model: 'mp_m_famdd_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Families DNF Male',
				model: 'g_m_y_famdnf_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Families Female',
				model: 'g_f_y_families_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Families FOR Male',
				model: 'g_m_y_famfor_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Families Gang Member?',
				model: 'csb_ramp_gang',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Families Gang Member? (IG)',
				model: 'ig_ramp_gang',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Farmer',
				model: 'a_m_m_farmer_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Fat Black Female',
				model: 'a_f_m_fatbla_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Fat Cult Female',
				model: 'a_f_m_fatcult_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Fat Latino Male',
				model: 'a_m_m_fatlatin_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Fat White Female',
				model: 'a_f_m_fatwhite_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Female Agent',
				model: 'a_f_y_femaleagent',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Ferdinand Kerimov (Mr. K) (CS)',
				model: 'cs_mrk',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Ferdinand Kerimov (Mr. K) (IG)',
				model: 'ig_mrk',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'FIB Architect',
				model: 'u_m_m_fibarchitect',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'FIB Mugger',
				model: 'u_m_y_fibmugger_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'FIB Office Worker',
				model: 's_m_m_fiboffice_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'FIB Office Worker 2',
				model: 's_m_m_fiboffice_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'FIB Security',
				model: 'mp_m_fibsec_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'FIB Security',
				model: 's_m_m_fibsec_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'FIB Suit (CS)',
				model: 'cs_fbisuit_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'FIB Suit (IG)',
				model: 'ig_fbisuit_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Financial Guru',
				model: 'u_m_o_finguru_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Fireman Male',
				model: 's_m_y_fireman_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Fitness Female',
				model: 'a_f_y_fitness_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Fitness Female 2',
				model: 'a_f_y_fitness_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Floyd Hebert (CS)',
				model: 'cs_floyd',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Floyd Hebert (IG)',
				model: 'ig_floyd',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'FOS Rep?',
				model: 'csb_fos_rep',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Gaffer',
				model: 's_m_m_gaffer_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Garbage Worker',
				model: 's_m_y_garbage',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Gardener',
				model: 's_m_m_gardener_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Gay Male',
				model: 'a_m_y_gay_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Gay Male 2',
				model: 'a_m_y_gay_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'General Fat Male',
				model: 'a_m_m_genfat_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'General Fat Male 2',
				model: 'a_m_m_genfat_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'General Hot Young Female',
				model: 'a_f_y_genhot_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'General Street Old Female',
				model: 'a_f_o_genstreet_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'General Street Old Male',
				model: 'a_m_o_genstreet_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'General Street Young Male',
				model: 'a_m_y_genstreet_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'General Street Young Male 2',
				model: 'a_m_y_genstreet_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Gerald',
				model: 'csb_g',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'GLENSTANK? Male',
				model: 'u_m_m_glenstank_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Golfer Male',
				model: 'a_m_m_golfer_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Golfer Young Female',
				model: 'a_f_y_golfer_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Golfer Young Male',
				model: 'a_m_y_golfer_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Griff',
				model: 'u_m_m_griff_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Grip',
				model: 's_m_y_grip_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Groom',
				model: 'csb_groom',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Groom (IG)',
				model: 'ig_groom',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Grove Street Dealer',
				model: 'csb_grove_str_dlr',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Guadalope (CS)',
				model: 'cs_guadalope',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Guido',
				model: 'u_m_y_guido_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Gun Vendor',
				model: 'u_m_y_gunvend_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'GURK? (CS)',
				model: 'cs_gurk',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hairdresser Male',
				model: 's_m_m_hairdress_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hao',
				model: 'csb_hao',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hao (IG)',
				model: 'ig_hao',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hasidic Jew Male',
				model: 'a_m_m_hasjew_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hasidic Jew Young Male',
				model: 'a_m_y_hasjew_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hick',
				model: 'csb_ramp_hic',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hick (IG)',
				model: 'ig_ramp_hic',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'High Security',
				model: 's_m_m_highsec_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'High Security 2',
				model: 's_m_m_highsec_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Highway Cop',
				model: 's_m_y_hwaycop_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hiker Female',
				model: 'a_f_y_hiker_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hiker Male',
				model: 'a_m_y_hiker_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hillbilly Male',
				model: 'a_m_m_hillbilly_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hillbilly Male 2',
				model: 'a_m_m_hillbilly_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hippie Female',
				model: 'a_f_y_hippie_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hippie Male',
				model: 'u_m_y_hippie_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hippie Male',
				model: 'a_m_y_hippy_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hipster',
				model: 'csb_ramp_hipster',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hipster (IG)',
				model: 'ig_ramp_hipster',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hipster Female',
				model: 'a_f_y_hipster_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hipster Female 2',
				model: 'a_f_y_hipster_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hipster Female 3',
				model: 'a_f_y_hipster_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hipster Female 4',
				model: 'a_f_y_hipster_04',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hipster Male',
				model: 'a_m_y_hipster_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hipster Male 2',
				model: 'a_m_y_hipster_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hipster Male 3',
				model: 'a_m_y_hipster_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hooker',
				model: 's_f_y_hooker_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hooker 2',
				model: 's_f_y_hooker_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hooker 3',
				model: 's_f_y_hooker_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hospital Scrubs Female',
				model: 's_f_y_scrubs_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hot Posh Female',
				model: 'u_f_y_hotposh_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hugh Welsh',
				model: 'csb_hugh',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hunter (CS)',
				model: 'cs_hunter',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Hunter (IG)',
				model: 'ig_hunter',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'IAA Security',
				model: 's_m_m_ciasec_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Impotent Rage',
				model: 'u_m_y_imporage',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Imran Shinowa',
				model: 'csb_imran',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Indian Male',
				model: 'a_m_m_indian_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Indian Old Female',
				model: 'a_f_o_indian_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Indian Young Female',
				model: 'a_f_y_indian_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Indian Young Male',
				model: 'a_m_y_indian_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jane',
				model: 'u_f_y_comjane',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Janet (CS)',
				model: 'cs_janet',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Janet (IG)',
				model: 'ig_janet',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Janitor',
				model: 'csb_janitor',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Janitor',
				model: 's_m_m_janitor',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jay Norris (IG)',
				model: 'ig_jay_norris',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jesco White (Tapdancing Hillbilly)',
				model: 'u_m_o_taphillbilly',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jesus',
				model: 'u_m_m_jesus_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jetskier',
				model: 'a_m_y_jetski_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jewel Heist Driver',
				model: 'hc_driver',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jewel Heist Gunman',
				model: 'hc_gunman',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jewel Heist Hacker',
				model: 'hc_hacker',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jewel Thief',
				model: 'u_m_m_jewelthief',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jeweller Assistant',
				model: 'u_f_y_jewelass_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jeweller Assistant (CS)',
				model: 'cs_jewelass',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jeweller Assistant (IG)',
				model: 'ig_jewelass',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jeweller Security',
				model: 'u_m_m_jewelsec_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jimmy Boston (CS)',
				model: 'cs_jimmyboston',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jimmy Boston (IG)',
				model: 'ig_jimmyboston',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jimmy De Santa (CS)',
				model: 'cs_jimmydisanto',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jimmy De Santa (IG)',
				model: 'ig_jimmydisanto',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jogger Female',
				model: 'a_f_y_runner_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jogger Male',
				model: 'a_m_y_runner_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Jogger Male 2',
				model: 'a_m_y_runner_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'John Marston',
				model: 'mp_m_marston_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Johnny Klebitz (CS)',
				model: 'cs_johnnyklebitz',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Johnny Klebitz (IG)',
				model: 'ig_johnnyklebitz',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Josef (CS)',
				model: 'cs_josef',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Josef (IG)',
				model: 'ig_josef',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Josh (CS)',
				model: 'cs_josh',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Josh (IG)',
				model: 'ig_josh',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Juggalo Female',
				model: 'a_f_y_juggalo_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Juggalo Male',
				model: 'a_m_y_juggalo_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Justin',
				model: 'u_m_y_justin',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Karen Daniels (CS)',
				model: 'cs_karen_daniels',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Karen Daniels (IG)',
				model: 'ig_karen_daniels',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Kerry McIntosh (IG)',
				model: 'ig_kerrymcintosh',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Kifflom Guy',
				model: 'u_m_y_baygor',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Korean Boss',
				model: 'g_m_m_korboss_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Korean Female',
				model: 'a_f_m_ktown_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Korean Female 2',
				model: 'a_f_m_ktown_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Korean Lieutenant',
				model: 'g_m_y_korlieut_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Korean Male',
				model: 'a_m_m_ktown_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Korean Old Female',
				model: 'a_f_o_ktown_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Korean Old Male',
				model: 'a_m_o_ktown_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Korean Young Male',
				model: 'g_m_y_korean_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Korean Young Male',
				model: 'a_m_y_ktown_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Korean Young Male 2',
				model: 'g_m_y_korean_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Korean Young Male 2',
				model: 'a_m_y_ktown_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Lamar Davis (CS)',
				model: 'cs_lamardavis',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Lamar Davis (IG)',
				model: 'ig_lamardavis',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Latino Handyman Male',
				model: 's_m_m_lathandy_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Latino Street Male 2',
				model: 'a_m_m_stlat_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Latino Street Young Male',
				model: 'a_m_y_stlat_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Latino Young Male',
				model: 'a_m_y_latino_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Lazlow (CS)',
				model: 'cs_lazlow',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Lazlow (IG)',
				model: 'ig_lazlow',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Lester Crest (CS)',
				model: 'cs_lestercrest',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Lester Crest (IG)',
				model: 'ig_lestercrest',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Life Invader (CS)',
				model: 'cs_lifeinvad_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Life Invader (IG)',
				model: 'ig_lifeinvad_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Life Invader 2 (IG)',
				model: 'ig_lifeinvad_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Life Invader Male',
				model: 's_m_m_lifeinvad_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Line Cook',
				model: 's_m_m_linecook',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Love Fist Willy',
				model: 'u_m_m_willyfist',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'LS Metro Worker Male',
				model: 's_m_m_lsmetro_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Magenta (CS)',
				model: 'cs_magenta',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Magenta (IG)',
				model: 'ig_magenta',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Maid',
				model: 's_f_m_maid_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Malibu Male',
				model: 'a_m_m_malibu_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mani',
				model: 'u_m_y_mani',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Manuel (CS)',
				model: 'cs_manuel',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Manuel (IG)',
				model: 'ig_manuel',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mariachi',
				model: 's_m_m_mariachi_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Marine',
				model: 'csb_ramp_marine',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Marine',
				model: 's_m_m_marine_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Marine 2',
				model: 's_m_m_marine_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Marine Young',
				model: 's_m_y_marine_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Marine Young 2',
				model: 's_m_y_marine_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Marine Young 3',
				model: 's_m_y_marine_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mark Fostenburg',
				model: 'u_m_m_markfost',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Marnie Allen (CS)',
				model: 'cs_marnie',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Marnie Allen (IG)',
				model: 'ig_marnie',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Martin Madrazo (CS)',
				model: 'cs_martinmadrazo',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mary-Ann Quinn (CS)',
				model: 'cs_maryann',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mary-Ann Quinn (IG)',
				model: 'ig_maryann',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Maude',
				model: 'csb_maude',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Maude (IG)',
				model: 'ig_maude',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Maxim Rashkovsky (CS)',
				model: 'csb_rashcosvki',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Maxim Rashkovsky (IG)',
				model: 'ig_rashcosvki',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mechanic',
				model: 's_m_y_xmech_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mechanic 2',
				model: 's_m_y_xmech_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Merryweather Merc',
				model: 'csb_mweather',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Meth Addict',
				model: 'a_m_y_methhead_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mexican',
				model: 'csb_ramp_mex',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mexican (IG)',
				model: 'ig_ramp_mex',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mexican Boss',
				model: 'g_m_m_mexboss_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mexican Boss 2',
				model: 'g_m_m_mexboss_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mexican Gang Member',
				model: 'g_m_y_mexgang_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mexican Goon',
				model: 'g_m_y_mexgoon_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mexican Goon 2',
				model: 'g_m_y_mexgoon_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mexican Goon 3',
				model: 'g_m_y_mexgoon_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mexican Labourer',
				model: 'a_m_m_mexlabor_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mexican Rural',
				model: 'a_m_m_mexcntry_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mexican Thug',
				model: 'a_m_y_mexthug_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Michelle (CS)',
				model: 'cs_michelle',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Michelle (IG)',
				model: 'ig_michelle',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Migrant Female',
				model: 's_f_y_migrant_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Migrant Male',
				model: 's_m_m_migrant_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Milton McIlroy (CS)',
				model: 'cs_milton',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Milton McIlroy (IG)',
				model: 'ig_milton',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mime Artist',
				model: 's_m_y_mime',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Minuteman Joe (CS)',
				model: 'cs_joeminuteman',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Minuteman Joe (IG)',
				model: 'ig_joeminuteman',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Miranda',
				model: 'u_f_m_miranda',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mistress',
				model: 'u_f_y_mistress',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Misty',
				model: 'mp_f_misty_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Molly (CS)',
				model: 'cs_molly',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Molly (IG)',
				model: 'ig_molly',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Money Man (CS)',
				model: 'csb_money',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Money Man (IG)',
				model: 'ig_money',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Motocross Biker',
				model: 'a_m_y_motox_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Motocross Biker 2',
				model: 'a_m_y_motox_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Movie Astronaut',
				model: 's_m_m_movspace_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Movie Director',
				model: 'u_m_m_filmdirector',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Movie Premiere Female',
				model: 's_f_y_movprem_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Movie Premiere Female (CS)',
				model: 'cs_movpremf_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Movie Premiere Male',
				model: 's_m_m_movprem_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Movie Premiere Male (CS)',
				model: 'cs_movpremmale',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Movie Star Female',
				model: 'u_f_o_moviestar',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mrs. Phillips (CS)',
				model: 'cs_mrsphillips',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mrs. Phillips (IG)',
				model: 'ig_mrsphillips',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mrs. Thornhill (CS)',
				model: 'cs_mrs_thornhill',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Mrs. Thornhill (IG)',
				model: 'ig_mrs_thornhill',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Natalia (CS)',
				model: 'cs_natalia',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Natalia (IG)',
				model: 'ig_natalia',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Nervous Ron (CS)',
				model: 'cs_nervousron',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Nervous Ron (IG)',
				model: 'ig_nervousron',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Nigel (CS)',
				model: 'cs_nigel',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Nigel (IG)',
				model: 'ig_nigel',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Niko Bellic',
				model: 'mp_m_niko_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'OG Boss',
				model: 'a_m_m_og_boss_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Old Man 1 (CS)',
				model: 'cs_old_man1a',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Old Man 1 (IG)',
				model: 'ig_old_man1a',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Old Man 2 (CS)',
				model: 'cs_old_man2',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Old Man 2 (IG)',
				model: 'ig_old_man2',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Omega (CS)',
				model: 'cs_omega',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Omega (IG)',
				model: 'ig_omega',
			}),
			Object.assign(new PedModelListItem(), {
				name: "O'Neil Brothers(IG)",
				model: 'ig_oneil',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Ortega',
				model: 'csb_ortega',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Ortega (IG)',
				model: 'ig_ortega',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Oscar',
				model: 'csb_oscar',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Paige Harris (CS)',
				model: 'csb_paige',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Paige Harris (IG)',
				model: 'ig_paige',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Paparazzi Male',
				model: 'a_m_m_paparazzi_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Paparazzi Young Male',
				model: 'u_m_y_paparazzi',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Paramedic',
				model: 's_m_m_paramedic_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Party Target',
				model: 'u_m_m_partytarget',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Partygoer',
				model: 'u_m_y_party_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Patricia (CS)',
				model: 'cs_patricia',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Patricia (IG)',
				model: 'ig_patricia',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Pest Control',
				model: 's_m_y_pestcont_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Peter Dreyfuss (CS)',
				model: 'cs_dreyfuss',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Peter Dreyfuss (IG)',
				model: 'ig_dreyfuss',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Pilot',
				model: 's_m_m_pilot_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Pilot',
				model: 's_m_y_pilot_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Pilot 2',
				model: 's_m_m_pilot_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Pogo the Monkey',
				model: 'u_m_y_pogo_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Polynesian',
				model: 'a_m_m_polynesian_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Polynesian Goon',
				model: 'g_m_y_pologoon_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Polynesian Goon 2',
				model: 'g_m_y_pologoon_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Polynesian Young',
				model: 'a_m_y_polynesian_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Poppy Mitchell',
				model: 'u_f_y_poppymich',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Porn Dude',
				model: 'csb_porndudes',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Postal Worker Male',
				model: 's_m_m_postal_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Postal Worker Male 2',
				model: 's_m_m_postal_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Priest (CS)',
				model: 'cs_priest',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Priest (IG)',
				model: 'ig_priest',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Princess',
				model: 'u_f_y_princess',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Prison Guard',
				model: 's_m_m_prisguard_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Prisoner',
				model: 's_m_y_prisoner_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Prisoner',
				model: 'u_m_y_prisoner_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Prisoner (Muscular)',
				model: 's_m_y_prismuscl_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Prologue Driver',
				model: 'u_m_y_proldriver_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Prologue Driver',
				model: 'csb_prologuedriver',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Prologue Host Female',
				model: 'a_f_m_prolhost_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Prologue Host Male',
				model: 'a_m_m_prolhost_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Prologue Host Old Female',
				model: 'u_f_o_prolhost_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Prologue Mourner Female',
				model: 'u_f_m_promourn_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Prologue Mourner Male',
				model: 'u_m_m_promourn_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Prologue Security',
				model: 'csb_prolsec',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Prologue Security',
				model: 'u_m_m_prolsec_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Prologue Security 2 (CS)',
				model: 'cs_prolsec_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Prologue Security 2 (IG)',
				model: 'ig_prolsec_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'PROS?',
				model: 'mp_g_m_pros_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Ranger Female',
				model: 's_f_y_ranger_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Ranger Male',
				model: 's_m_y_ranger_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Reporter',
				model: 'csb_reporter',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Republican Space Ranger',
				model: 'u_m_y_rsranger_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Rival Paparazzo',
				model: 'u_m_m_rivalpap',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Road Cyclist',
				model: 'a_m_y_roadcyc_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Robber',
				model: 's_m_y_robber_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Rocco Pelosi',
				model: 'csb_roccopelosi',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Rocco Pelosi (IG)',
				model: 'ig_roccopelosi',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Rural Meth Addict Female',
				model: 'a_f_y_rurmeth_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Rural Meth Addict Male',
				model: 'a_m_m_rurmeth_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Russian Drunk (CS)',
				model: 'cs_russiandrunk',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Russian Drunk (IG)',
				model: 'ig_russiandrunk',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Sales Assistant (High-End)',
				model: 's_f_m_shop_high',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Sales Assistant (Low-End)',
				model: 's_f_y_shop_low',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Sales Assistant (Mask Stall)',
				model: 's_m_y_shop_mask',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Sales Assistant (Mid-Price)',
				model: 's_f_y_shop_mid',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Salton Female',
				model: 'a_f_m_salton_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Salton Male',
				model: 'a_m_m_salton_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Salton Male 2',
				model: 'a_m_m_salton_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Salton Male 3',
				model: 'a_m_m_salton_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Salton Male 4',
				model: 'a_m_m_salton_04',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Salton Old Female',
				model: 'a_f_o_salton_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Salton Old Male',
				model: 'a_m_o_salton_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Salton Young Male',
				model: 'a_m_y_salton_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Salvadoran Boss',
				model: 'g_m_y_salvaboss_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Salvadoran Goon',
				model: 'g_m_y_salvagoon_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Salvadoran Goon 2',
				model: 'g_m_y_salvagoon_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Salvadoran Goon 3',
				model: 'g_m_y_salvagoon_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Scientist',
				model: 's_m_m_scientist_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Screenwriter',
				model: 'csb_screen_writer',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Screenwriter (IG)',
				model: 'ig_screen_writer',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Security Guard',
				model: 's_m_m_security_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Sheriff Female',
				model: 's_f_y_sheriff_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Sheriff Male',
				model: 's_m_y_sheriff_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Shopkeeper',
				model: 'mp_m_shopkeep_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Simeon Yetarian (CS)',
				model: 'cs_siemonyetarian',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Simeon Yetarian (IG)',
				model: 'ig_siemonyetarian',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Skater Female',
				model: 'a_f_y_skater_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Skater Male',
				model: 'a_m_m_skater_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Skater Young Male',
				model: 'a_m_y_skater_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Skater Young Male 2',
				model: 'a_m_y_skater_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Skid Row Female',
				model: 'a_f_m_skidrow_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Skid Row Male',
				model: 'a_m_m_skidrow_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Snow Cop Male',
				model: 's_m_m_snowcop_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Solomon Richards (CS)',
				model: 'cs_solomon',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Solomon Richards (IG)',
				model: 'ig_solomon',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central Female',
				model: 'a_f_m_soucent_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central Female 2',
				model: 'a_f_m_soucent_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central Latino Male',
				model: 'a_m_m_socenlat_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central Male',
				model: 'a_m_m_soucent_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central Male 2',
				model: 'a_m_m_soucent_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central Male 3',
				model: 'a_m_m_soucent_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central Male 4',
				model: 'a_m_m_soucent_04',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central MC Female',
				model: 'a_f_m_soucentmc_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central Old Female',
				model: 'a_f_o_soucent_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central Old Female 2',
				model: 'a_f_o_soucent_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central Old Male',
				model: 'a_m_o_soucent_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central Old Male 2',
				model: 'a_m_o_soucent_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central Old Male 3',
				model: 'a_m_o_soucent_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central Young Female',
				model: 'a_f_y_soucent_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central Young Female 2',
				model: 'a_f_y_soucent_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central Young Female 3',
				model: 'a_f_y_soucent_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central Young Male',
				model: 'a_m_y_soucent_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central Young Male 2',
				model: 'a_m_y_soucent_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central Young Male 3',
				model: 'a_m_y_soucent_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'South Central Young Male 4',
				model: 'a_m_y_soucent_04',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Sports Biker',
				model: 'u_m_y_sbike',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Spy Actor',
				model: 'u_m_m_spyactor',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Spy Actress',
				model: 'u_f_y_spyactress',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Stag Party Groom',
				model: 'u_m_y_staggrm_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Steve Haines (CS)',
				model: 'cs_stevehains',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Steve Haines (IG)',
				model: 'ig_stevehains',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Street Performer',
				model: 's_m_m_strperf_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Street Preacher',
				model: 's_m_m_strpreach_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Street Punk',
				model: 'g_m_y_strpunk_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Street Punk 2',
				model: 'g_m_y_strpunk_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Street Vendor',
				model: 's_m_m_strvend_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Street Vendor Young',
				model: 's_m_y_strvend_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Stretch (CS)',
				model: 'cs_stretch',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Stretch (IG)',
				model: 'ig_stretch',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Stripper',
				model: 'csb_stripper_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Stripper',
				model: 's_f_y_stripper_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Stripper 2',
				model: 'csb_stripper_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Stripper 2',
				model: 's_f_y_stripper_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Stripper Lite',
				model: 's_f_y_stripperlite',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Stripper Lite',
				model: 'mp_f_stripperlite',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Sunbather Male',
				model: 'a_m_y_sunbathe_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Surfer',
				model: 'a_m_y_surfer_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'SWAT',
				model: 's_m_y_swat_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Sweatshop Worker',
				model: 's_f_m_sweatshop_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Sweatshop Worker Young',
				model: 's_f_y_sweatshop_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Talina (IG)',
				model: 'ig_talina',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tanisha (CS)',
				model: 'cs_tanisha',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tanisha (IG)',
				model: 'ig_tanisha',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tao Cheng (CS)',
				model: 'cs_taocheng',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tao Cheng (IG)',
				model: 'ig_taocheng',
			}),
			Object.assign(new PedModelListItem(), {
				name: "Tao's Translator(CS)",
				model: 'cs_taostranslator',
			}),
			Object.assign(new PedModelListItem(), {
				name: "Tao's Translator(IG)",
				model: 'ig_taostranslator',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tattoo Artist',
				model: 'u_m_y_tattoo_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tennis Coach (CS)',
				model: 'cs_tenniscoach',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tennis Coach (IG)',
				model: 'ig_tenniscoach',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tennis Player Female',
				model: 'a_f_y_tennis_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tennis Player Male',
				model: 'a_m_m_tennis_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Terry (CS)',
				model: 'cs_terry',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Terry (IG)',
				model: 'ig_terry',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'The Lost MC Female',
				model: 'g_f_y_lost_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'The Lost MC Male',
				model: 'g_m_y_lost_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'The Lost MC Male 2',
				model: 'g_m_y_lost_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'The Lost MC Male 3',
				model: 'g_m_y_lost_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tom (CS)',
				model: 'cs_tom',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tonya',
				model: 'csb_tonya',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tonya (IG)',
				model: 'ig_tonya',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Topless',
				model: 'a_f_y_topless_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tourist Female',
				model: 'a_f_m_tourist_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tourist Male',
				model: 'a_m_m_tourist_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tourist Young Female',
				model: 'a_f_y_tourist_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tourist Young Female 2',
				model: 'a_f_y_tourist_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tracey De Santa (CS)',
				model: 'cs_tracydisanto',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tracey De Santa (IG)',
				model: 'ig_tracydisanto',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Traffic Warden',
				model: 'csb_trafficwarden',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Traffic Warden (IG)',
				model: 'ig_trafficwarden',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tramp Female',
				model: 'a_f_m_tramp_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tramp Male',
				model: 'a_m_m_tramp_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tramp Old Male',
				model: 'u_m_o_tramp_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tramp Old Male',
				model: 'a_m_o_tramp_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Transport Worker Male',
				model: 's_m_m_gentransport',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Transvestite Male',
				model: 'a_m_m_tranvest_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Transvestite Male 2',
				model: 'a_m_m_tranvest_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Trucker Male',
				model: 's_m_m_trucker_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Tyler Dixon (IG)',
				model: 'ig_tylerdix',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Undercover Cop',
				model: 'csb_undercover',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'United Paper Man (CS)',
				model: 'cs_paper',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'United Paper Man (IG)',
				model: 'ig_paper',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'UPS Driver',
				model: 's_m_m_ups_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'UPS Driver 2',
				model: 's_m_m_ups_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'US Coastguard',
				model: 's_m_y_uscg_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Vagos Female',
				model: 'g_f_y_vagos_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Vagos Male (CS)',
				model: 'csb_vagspeak',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Vagos Male (IG)',
				model: 'ig_vagspeak',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Vagos Male 2',
				model: 'mp_m_g_vagfun_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Valet',
				model: 's_m_y_valet_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Vespucci Beach Male',
				model: 'a_m_y_beachvesp_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Vespucci Beach Male 2',
				model: 'a_m_y_beachvesp_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Vinewood Douche',
				model: 'a_m_y_vindouche_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Vinewood Female',
				model: 'a_f_y_vinewood_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Vinewood Female 2',
				model: 'a_f_y_vinewood_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Vinewood Female 3',
				model: 'a_f_y_vinewood_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Vinewood Female 4',
				model: 'a_f_y_vinewood_04',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Vinewood Male',
				model: 'a_m_y_vinewood_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Vinewood Male 2',
				model: 'a_m_y_vinewood_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Vinewood Male 3',
				model: 'a_m_y_vinewood_03',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Vinewood Male 4',
				model: 'a_m_y_vinewood_04',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Wade(CS)',
				model: 'cs_wade',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Wade(IG)',
				model: 'ig_wade',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Waiter',
				model: 's_m_y_waiter_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Wei Cheng(CS)',
				model: 'cs_chengsr',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Wei Cheng(IG)',
				model: 'ig_chengsr',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'White Street Male',
				model: 'a_m_y_stwhi_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'White Street Male 2',
				model: 'a_m_y_stwhi_02',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Window Cleaner',
				model: 's_m_y_winclean_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Yoga Female',
				model: 'a_f_y_yoga_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Yoga Male',
				model: 'a_m_y_yoga_01',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Zimbor(CS)',
				model: 'cs_zimbor',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Zimbor(IG)',
				model: 'ig_zimbor',
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Zombie',
				model: 'u_m_y_zombie_01',
			}),

			// Character
			Object.assign(new PedModelListItem(), {
				name: 'Franklin',
				model: 'player_one',
				type: PedModelType.MainCharacter,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Michael',
				model: 'player_zero',
				type: PedModelType.MainCharacter,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Trevor',
				model: 'player_two',
				type: PedModelType.MainCharacter,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Multiplayer (Female)',
				model: 'mp_f_freemode_01',
				type: PedModelType.MainCharacter,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Multiplayer (Male)',
				model: 'mp_m_freemode_01',
				type: PedModelType.MainCharacter,
			}),

			// Custom
			Object.assign(new PedModelListItem(), {
				name: 'Batman',
				model: 'batman',
				type: PedModelType.Custom,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Stan Lee',
				model: 'stan_lee',
				type: PedModelType.Custom,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Spiderman',
				model: 'spiderman',
				type: PedModelType.Custom,
			}),
			Object.assign(new PedModelListItem(), {
				name: 'Wonder Woman',
				model: 'wonderwoman',
				type: PedModelType.Custom,
			}),
		];
	}
}
