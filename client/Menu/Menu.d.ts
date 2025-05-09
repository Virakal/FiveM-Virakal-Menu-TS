type MenuMap = Map<string, MenuItem[]>

interface MenuItem {
    text: string;
    sub?: string;
    action?: string;
    state?: string;
    image?: string;
    configkey?: string;
    key?: string;
}
