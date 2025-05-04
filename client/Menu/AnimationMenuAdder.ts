export default class AnimationMenuAdder implements MenuAdder {
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
