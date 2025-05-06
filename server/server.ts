console.log("[virakal-menu] Server Resource Started");

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { realpathSync } from 'node:fs';
import WeatherList from '@shared/Data/WeatherList';

interface Time {
    hours: number,
    minutes: number,
    seconds: number,
}

class Server {
    configPath = 'virakal-configs/';
    currentWeather: number = -1;
    currentTime: Time

    constructor() {
        onNet('virakal:requestWeather', this.onRequestWeather.bind(this));
        onNet('virakal:changeWeather', this.onChangeWeather.bind(this));

        onNet('virakal:requestTime', this.onRequestTime.bind(this));
        onNet('virakal:changeTime', this.onChangeTime.bind(this));

        onNet('virakal:getConfig', this.onGetConfig.bind(this));
        onNet('virakal:setConfig', this.onGetConfig.bind(this));

        const realPath = realpathSync(this.configPath);
        console.log(`Virakal Menu configs at ${realPath}`);
        this.makeConfigDirectory();
    }

    onChangeWeather(weather: number) {
        const name = GetPlayerName(source.toString());
        this.currentWeather = weather;
        console.log(`Weather changed to ${WeatherList.getNiceName(weather)} (${weather}) by ${name}`);
        emitNet('virakal:setWeather', -1, weather);
    }

    onRequestWeather() {
        const sourceStr = source.toString();
        const name = GetPlayerName(sourceStr);
        const weather = this.currentWeather;

        console.log(`Weather requested by ${name}. Weather is ${WeatherList.getNiceName(weather)} (${weather}).`);

        if (weather !== -1) {
            emitNet('virakal:setWeather', sourceStr, weather);
        }
    }

    onChangeTime(hours: number, minutes: number, seconds: number) {
        const sourceStr = source.toString();
        const name = GetPlayerName(sourceStr);
        this.currentTime = { hours, minutes, seconds };
        // TODO: Nice name
        console.log(`Time changed to ${this.prettyTime} by ${name}`);

        const time = this.currentTime;

        if (time !== null) {
            emitNet('virakal:setTime', sourceStr, time.hours, time.minutes, time.seconds);
        }
    }

    onRequestTime() {
        const sourceStr = source.toString();
        const name = GetPlayerName(sourceStr);
        console.log(`Time requested by ${name}. Time is ${this.prettyTime}.`);
    }

    async onGetConfig() {
        const path = this.getConfigPathForPlayer(source);
        const sourceName = GetPlayerName(source.toString());
        const playerId = source.toString();
        let contents = {};

        try {
            contents = JSON.parse((await readFile(path)).toString());
        } catch {
            console.log(`${sourceName} requested a config from file ${path} but it doesn't exist yet.`);
            contents = {};
        }

        emitNet('virakal:returnConfig', playerId, contents);
    }

    async onSetConfig(config: any) {
        const path = this.getConfigPathForPlayer(source);

        await writeFile(path, config, {
            flag: 'w',
            mode: 0o644,
        });
    }

    get prettyTime(): string {
        const time = this.currentTime;

        if (time === undefined) {
            return '[none]';
        }

        return [time.hours, time.minutes, time.seconds].map((x) => ('00' + x).slice(-2)).join(':');
    }

    private async makeConfigDirectory() {
        await mkdir(this.configPath);
    }

    private getConfigPathForPlayer(playerId: number) {
        const handles = getPlayerIdentifiers(playerId).filter((s) => s.startsWith('license:'));
        let handle;

        if (GetConvar('sv_fxdkMode', '0') === '1') {
            handle = 'developer';
        } else if (handles.length === 0) {
            handle = 'default';
        } else {
            handle = handles[0].replaceAll(':', '_');
        }

        return `${this.configPath.replace(/[/\\]$/, '')}/${handle}.json`;
    }
}

new Server();
