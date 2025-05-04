export default class UIMenuAdder implements MenuAdder {
    add(menus: MenuMap) {
        menus.set('ui', [
            {
                text: 'Large Minimap',
                action: 'bigmap',
                state: 'OFF',
                configkey: 'BigMap',
            },
            {
                text: 'Large Minimap on Z / D-Pad Down',
                action: 'bigmapondown',
                state: 'ON',
                configkey: 'BigMapOnDown',
            }
        ]);

        return menus;
    }
}
