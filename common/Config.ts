import { RUNNING_ON_CLIENT } from "utils";

export class Config {
    private store = new Map<string, string>();
    private defaults = new Map<string, string>();

    get(key: string): string | null {
        if (this.store.has(key)) {
            return this.store.get(key);
        }

        if (this.defaults.has(key)) {
            return this.defaults.get(key);
        }

        // TODO: Throw exception?
        return undefined;
    }

    getBool(key: string): boolean | null {
        const val = this.get(key);

        if (val.toLowerCase() === 'true') {
            return true;
        }

        if (val.toLowerCase() === 'false') {
            return false;
        }

        return null;
    }

    set(key: string, value: string | boolean): void {
        this.store.set(key, value.toString());

        if (RUNNING_ON_CLIENT) {
            emitNet('virakal:setConfig', this.toJson());
        }

        emit('virakal:configChanged', key, value);
    }

    setDefault(key: string, value: string | boolean): void {
        this.defaults.set(key, value.toString());
    }

    setDefaults(defaults: { [key: string ]: string | boolean }): void {
        for (const [key, value] of Object.entries(defaults)) {
            this.setDefault(key, value);
        }
    }

    has(key: string, includeDefaults: boolean = false): boolean {
        if (this.store.has(key)) {
            return true;
        }

        if (includeDefaults && this.defaults.has(key)) {
            return true;
        }

        return false;
    }

    get size() {
        return this.store.size;
    }

    toJson(): string {
        return JSON.stringify(Object.fromEntries(this.store));
    }

    fromJson(json: string): void {
        this.fromObject(JSON.parse(json));
    }

    fromObject(obj: { [key: string]: string }): void {
        this.store = new Map(Object.entries(obj));
    }
}

let instance: Config;

export function getConfig(): Config {
    if (!instance) {
        instance = new Config();
    }

    return instance;
}

export default getConfig;
