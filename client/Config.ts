export class Config {
    private store: Map<string, string> = new Map();
    private defaults: Map<string, string> = new Map();

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

    set(key: string, value: string) {
        this.store.set(key, value);

        TriggerServerEvent('virakal:setConfig', this.store);
        TriggerEvent('virakal:configChanged', key, value);
    }

    setDefault(key: string, value: string): void {
        this.defaults.set(key, value);
    }

    has(key: string, includeDefaults: boolean = false) {
        if (this.store.has(key)) {
            return true;
        }

        if (includeDefaults && this.defaults.has(key)) {
            return true;
        }

        return false;
    }

    toJson(): string {
        return JSON.stringify(this.store);
    }

    fromJson(json: string) {
        this.store = new Map(Object.entries(JSON.parse(json)));
    }
}

let instance: Config;

const handler: ProxyHandler<Config> = {
    get: (target, prop) => target.get(prop as string),
    set: (target, prop, newVal) => {
        target.set(prop as string, newVal);
        return true;
    }
}

export function getConfig(): Config {
    if (!instance) {
        // instance = new Proxy<Config>(new Config(), handler);
        instance = new Config();
    }

    return instance;
}

export default getConfig;
