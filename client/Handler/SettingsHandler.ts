import WeatherList from "@common/Data/WeatherList";
import { notify } from "@common/utils";

const WEATHER_TRANSITION_TIME = 5;

export default class SettingsHandler implements Handler {
    firstSpawn = true;

    constructor() {
        on('playerSpawned', this.onFirstSpawn.bind(this));
        onNet('virakal:setWeather', this.onSetWeather);
        onNet('virakal:setTime', this.onSetTime);

        RegisterNuiCallback('weather', this.onWeather);
        RegisterNuiCallback('time', this.onTime);
    }

    onWeather(data: NuiData, cb: NuiCallback): NuiCallback {
        emitNet('virakal:changeWeather', data.action);
        cb('ok');
        return cb;
    }

    onSetWeather(weather: number, name: string) {
        if (weather < 0) {
            return;
        }

        const niceName = WeatherList.getNiceName(weather) ?? 'Unknown';

        SetWeatherTypeOverTime(WeatherList.getInternalName(weather), WEATHER_TRANSITION_TIME);

        if (name) {
            notify(`~s~Weather changed to ${niceName} by ${name}.`);
        } else {
            notify(`~s~Weather changed to ${niceName}.`);
        }
    }

    onSetTime(h: number, m: number, s: number, name: string | null) {
        NetworkOverrideClockTime(h, m, s);
        SetClockTime(h, m, s);

        if (name) {
            notify(`~s~Time changed to ${('00' + h).slice(-2)}:${('00' + m).slice(-2)} by ${name}.`);
        }
    }

    onTime(data: NuiData, cb: NuiCallback): NuiCallback {
        emitNet('virakal:changeTime', Number.parseInt(data.action, 10), 0, 0);
        cb('ok');
        return cb;
    }

    onFirstSpawn() {
        if (!this.firstSpawn) {
            return;
        }

        this.firstSpawn = false;

        emitNet('virakal:requestWeather');
        emitNet('virakal:requestTime');
    }
}
