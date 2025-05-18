export type MenuMap = Map<string, MenuItem[]>

export interface MenuItem {
    text: string,
    sub?: string,
    image?: string,
    state?: string,
    action?: string,
    configkey?: string,
    key?: string,
}
