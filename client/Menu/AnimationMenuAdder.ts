import { MenuAdder } from "Menu/MenuAdder";
import type { MenuMap } from '@common/Menu';

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
