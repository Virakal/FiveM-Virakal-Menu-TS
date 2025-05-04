import PedModelList from "Data/PedModelList";
import { PedModelType } from "Data/PedModelList";

export default class AnimalBombMenuAdder implements MenuAdder {
    add(menus: MenuMap) {
        menus.set('animalbomb', this.getAnimalBombMenu());
        return menus;
    }

    private getAnimalBombMenu() {
        const actionPrefix = 'anibomb';
        const menu: MenuItem[] = [];
        const animalModelInfo = PedModelList.getByType(PedModelType.Animal);

        for (const info of animalModelInfo) {
            menu.push({
                text: info.name,
                action: `${actionPrefix} ${info.model}`,
                key: info.model,
            });
        }

        return menu;
    }
}
