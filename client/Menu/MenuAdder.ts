import MenuManager from "MenuManager";

export interface MenuAdder {
    add(menus: MenuMap): MenuMap
    setManager?(menuManager: MenuManager): void
    onMenusAdded?(): void;
}

// add a registry of the type you expect
export namespace MenuAdder {
    type Constructor<T> = {
        new(...args: any[]): T;
        readonly prototype: T;
    }

    const implementations: Constructor<MenuAdder>[] = [];

    export function getImplementations(): Constructor<MenuAdder>[] {
        return implementations;
    }

    export function register<T extends Constructor<MenuAdder>>(ctor: T) {
        implementations.push(ctor);
        return ctor;
    }
}

export abstract class BaseMenuAdder implements MenuAdder {
    menuManager: MenuManager;

    setManager(menuManager: MenuManager): void {
        this.menuManager = menuManager
    }

    abstract add(menus: MenuMap): MenuMap;
}
