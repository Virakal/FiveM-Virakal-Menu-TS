import WeatherList from "@common/Data/WeatherList";
import { CLEAN_STATION_COUNT, getRadioStationName } from "@common/Data/RadioStation";
import getConfig from '@common/Config';
import { MenuAdder } from "Menu/MenuAdder";

@MenuAdder.register
export default class SettingsMenuAdder {
    add(menus: MenuMap) {
        menus.set('settings', [
            {
                text: 'Change Weather',
                sub: 'settings.weather',
            },
            {
                text: 'Change Time',
                sub: 'settings.time',
            },
            {
                text: 'Default Radio Station',
                sub: 'settings.defaultRadio',
            },
        ]);

        menus.set('settings.defaultRadio', this.getDefaultRadioMenu());
        menus.set('settings.time', this.getTimeMenu());
        menus.set('settings.weather', this.getWeatherMenu());

        return menus;
    }

    getDefaultRadioMenu(): MenuItem[] {
        const config = getConfig();
        const menu: MenuItem[] = [];
        let defaultText = 'No Default';
        let currentDefaultStation = -1;

        if (config.has('DefaultRadioStation')) {
            currentDefaultStation = Number.parseInt(config.get('DefaultRadioStation'), 10) ?? -1;
        }

        if (currentDefaultStation === -1) {
            defaultText = defaultText + ' (Current)';
        }

        menu.push({
            text: defaultText,
            action: 'defaultradio -1',
        });

        let radioIds = new Array(CLEAN_STATION_COUNT).fill(true);
        const radioStationsArray: string[] = radioIds.map((_, i) => getRadioStationName(i));

        const radioStations = new Map(radioStationsArray.entries());

        radioStations.set(100, getRadioStationName(100));
        radioStations.set(101, getRadioStationName(101));

        for (const [i, name] of radioStations) {
            const maybeCurrentSuffix = currentDefaultStation === i ? ' (Current)' : '';

            menu.push({
                text: name + maybeCurrentSuffix,
                action: `defaultradio ${i}`,
            });
        }

        return menu;
    }

    private getTimeMenu(): MenuItem[] {
        const menu: MenuItem[] = [];
        const namedTimes = new Map<string, number>(Object.entries({
            Morning: 6,
            Midday: 12,
            Evening: 18,
            Midnight: 0,
        }));

        for (let i = 0; i < 24; i++) {
            const hour = ('00' + i).slice(-2);
            namedTimes.set(`${hour}:00`, i);
        }

        for (const [name, time] of namedTimes) {
            menu.push({
                text: name,
                action: `time ${time}`,
            });
        }

        return menu;
    }

    private getWeatherMenu(): MenuItem[] {
        const menu: MenuItem[] = [];

        for (let i = 0; i < WeatherList.size; i++) {
            menu.push({
                text: WeatherList.getNiceName(i),
                action: `weather ${i}`,
            });
        }

        return menu;
    }
}
