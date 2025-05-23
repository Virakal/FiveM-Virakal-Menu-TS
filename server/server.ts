console.log('[virakal-menu] Server Resource Started');

import { realpathSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import WeatherList from '@common/Data/WeatherList';

interface Time {
	hours: number;
	minutes: number;
	seconds: number;
}

class Server {
	configPath = 'virakal-configs/';
	currentWeather = -1;
	currentTime: Time;

	constructor() {
		onNet('virakalMenu:requestWeather', this.onRequestWeather.bind(this));
		onNet('virakalMenu:changeWeather', this.onChangeWeather.bind(this));

		onNet('virakalMenu:requestTime', this.onRequestTime.bind(this));
		onNet('virakalMenu:changeTime', this.onChangeTime.bind(this));

		onNet('virakalMenu:getConfig', this.onGetConfig.bind(this));
		onNet('virakalMenu:setConfig', this.onSetConfig.bind(this));

		const realPath = realpathSync(this.configPath);
		console.log(`Virakal Menu configs at ${realPath}`);
		this.makeConfigDirectory();
	}

	onChangeWeather(weather: number) {
		const name = GetPlayerName(source.toString());
		this.currentWeather = weather;
		console.log(
			`Weather changed to ${WeatherList.getNiceName(weather)} (${weather}) by ${name}`,
		);
		emitNet('virakalMenu:setWeather', -1, weather);
	}

	onRequestWeather() {
		const sourceStr = source.toString();
		const name = GetPlayerName(sourceStr);
		const weather = this.currentWeather;

		console.log(
			`Weather requested by ${name}. Weather is ${WeatherList.getNiceName(weather)} (${weather}).`,
		);

		if (weather !== -1) {
			emitNet('virakalMenu:setWeather', sourceStr, weather);
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
			emitNet(
				'virakalMenu:setTime',
				sourceStr,
				time.hours,
				time.minutes,
				time.seconds,
			);
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
			console.log(
				`${sourceName} requested a config from file ${path} but it doesn't exist yet.`,
			);
			contents = {};
		}

		emitNet('virakalMenu:returnConfig', playerId, contents);
	}

	async onSetConfig(config: string) {
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

		return [time.hours, time.minutes, time.seconds]
			.map((x) => `00${x}`.slice(-2))
			.join(':');
	}

	private async makeConfigDirectory() {
		try {
			await mkdir(this.configPath);
		} catch (e) {
			if (e?.code !== 'EEXIST') {
				throw e;
			}
		}
	}

	private getConfigPathForPlayer(playerId: number) {
		const handles = getPlayerIdentifiers(playerId).filter((s) =>
			s.startsWith('license:'),
		);

		let handle: string;

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
