export default class WeatherList {
    static internalNames = [
        'EXTRASUNNY',
        'CLEAR',
        'CLOUDS',
        'SMOG',
        'FOGGY',
        'OVERCAST',
        'RAIN',
        'THUNDER',
        'CLEARING',
        'NEUTRAL',
        'SNOW',
        'BLIZZARD',
        'SNOWLIGHT',
        'XMAS',
    ];

    static niceNames = [
        'Extra Sunny',
        'Clear',
        'Cloudy',
        'Smoggy',
        'Foggy',
        'Overcast',
        'Rain',
        'Thunder',
        'Clearing',
        'Neutral',
        'Snowing',
        'Blizzard',
        'Light Snow',
        'Christmas',
    ]

    static get size() {
        return this.internalNames.length;
    }

    static getInternalName(index: number): string | undefined {
        return this.internalNames[index];
    }

    static getNiceName(index: number): string | undefined {
        return this.niceNames[index];
    }
}
