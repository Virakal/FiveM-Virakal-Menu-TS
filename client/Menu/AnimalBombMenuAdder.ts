import PedModelList from "@common/Data/PedModelList";
import { PedModelType } from "@common/Data/PedModelList";
import { MenuAdder } from "Menu/MenuAdder";
import type { MenuItem, MenuMap } from '@common/Menu';

@MenuAdder.register
export default class AnimalBombMenuAdder {
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
