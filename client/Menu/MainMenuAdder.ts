import { MenuAdder } from "Menu/MenuAdder";
import type { MenuMap } from '@common/Menu';

@MenuAdder.register
export default class MainMenuAdder {
    add(menus: MenuMap) {
        menus.set('mainmenu', [
            {
                text: "Player",
                sub: "player"
            },
            {
                text: "Teleport",
                sub: "teleport"
            },
            {
                text: "Vehicles",
                sub: "vehicles"
            },
            {
                text: "Weapons",
                sub: "weapons"
            },
            {
                text: "Police",
                sub: "police"
            },
            {
                text: "Settings",
                sub: "settings"
            },
            {
                text: "Animate",
                sub: "animation"
            },
            {
                text: "UI",
                sub: "ui"
            },
            {
                text: "Animal Bombs",
                sub: "animalbomb"
            }
        ])

        return menus;
    }
}
