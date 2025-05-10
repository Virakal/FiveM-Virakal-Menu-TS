import getConfig, { Config } from '@common/Config';
import { BaseMenuAdder, MenuAdder } from "Menu/MenuAdder";

@MenuAdder.register
export default class VehicleMenuAdder extends BaseMenuAdder {
    add(menus: MenuMap): MenuMap {
        menus.set('vehicles', this.getVehiclesMenu());

        menus.set('vehicles.spawn', this.getSpawnMenu());
        // menus.set('vehicles.save', this.getGarageSaveMenu());
        // menus.set('vehicles.load', this.getGarageLoadMenu());
        menus.set('vehicles.appearance', this.getAppearanceMenu());
        menus.set('vehicles.mods', this.getModsMenu());
        // menus.set('vehicles.seats', this.getSeatsMenu());
        // menus.set('vehicles.boostPower', this.getBoostPowerMenu());

        // // Add vehicle spawn menus
        // menus.set('vehicles.spawn.search', this.getSpawnSearchMenu());
        // menus = this.addSpawnByTypeMenus(menus);
        // menus = this.addSpawnByDlcMenus(menus);
        // menus.set('vehicles.spawn.fun', this.getVehicleSpawnMenu(VehicleList.GetByTag("fun")));

        // // Add vehicle appearance menus
        menus.set('vehicles.appearance.rainbowSettings', this.getRainbowMenu());
        menus.set('vehicles.appearance.rainbowSettings.speed', this.getRainbowSpeedMenu());
        // menus.set('vehicles.appearance.numberPlateSettings', this.getPlatesMenu());
        // menus.set('vehicles.appearance.windowTintSettings', this.getWindowTintMenu());
        // menus.set('vehicles.appearance.livery', this.getLiveryMenu());
        // menus.set('vehicles.appearance.roofLivery', this.getRoofLiveryMenu());
        // menus.set('vehicles.appearance.colourCombinations', this.getColourCombinationsMenu());

        // menus.set('vehicles.appearance.customBothColour', this.getCustomColourMenu("vehcustomboth"));
        // menus.set('vehicles.appearance.customPrimaryColour', this.getCustomColourMenu("vehcustomprimary"));
        // menus.set('vehicles.appearance.customSecondaryColour', this.getCustomColourMenu("vehcustomsecondary"));

        // menus.set('vehicles.appearance.bothColour', this.getPaintColourMenu("vehboth"));
        // menus.set('vehicles.appearance.primaryColour', this.getPaintColourMenu("vehprimary"));
        // menus.set('vehicles.appearance.secondaryColour', this.getPaintColourMenu("vehsecondary"));
        // menus.set('vehicles.appearance.pearlescentColour', this.getPaintColourMenu("vehpearl"));
        // menus.set('vehicles.appearance.rimColour', this.getPaintColourMenu("vehrim"));
        // menus.set('vehicles.appearance.dashColour', this.getPaintColourMenu("vehdashcolour"));
        // menus.set('vehicles.appearance.trimColour', this.getPaintColourMenu("vehtrimcolour"));

        // // Add mods menus
        // menus.set('vehicles.mods.lights', this.getModLightsMenu());
        // menus.set('vehicles.mods.lights.neonColour', this.getCustomColourMenu("vehneon"));
        menus.set('vehicles.mods.performance', this.getModPerformanceMenu());
        menus.set('vehicles.mods.wheels', this.getModWheelsMenu());
        // menus.set('vehicles.mods.wheels.tyreSmokeColour', this.getCustomColourMenu("vehtyresmokecolour"));
        // menus = this.addOtherModsMenus(menus);

        return menus;
    }

    onMenusAdded(): void {
        on('virakalMenu:configChanged', this.onConfigChanged.bind(this));
    }

    onConfigChanged(key: string, value: string): void {
        if (key === 'RainbowSpeed') {
            this.menuManager.updateAndSend('vehicles.appearance.rainbowSettings.speed', this.getRainbowSpeedMenu());
        }
    }

    getVehiclesMenu(): MenuItem[] {
        return [
            {
                text: 'Spawn Vehicle',
                sub: 'vehicles.spawn',
            },
            {
                text: 'Load Vehicle from Garage',
                sub: 'vehicles.load',
            },
            {
                text: 'Save Vehicle to Garage',
                sub: 'vehicles.save',
            },
            {
                text: 'Vehicle Appearance',
                sub: 'vehicles.appearance',
            },
            {
                text: 'Vehicle Mods',
                sub: 'vehicles.mods',
            },
            {
                text: 'Change Seats',
                sub: 'vehicles.seats',
            },
            {
                text: 'Fix Vehicle',
                action: 'veh fix'
            },
            {
                text: 'Clean Vehicle',
                action: 'veh clean',
            },
            {
                text: 'Flip Vehicle Onto Wheels',
                action: 'veh flip',
            },
            {
                text: 'Invincible Vehicle',
                action: 'veh invincible',
                state: 'ON',
                configkey: 'InvincibleVehicle',
            },
            {
                text: 'Boost on Horn',
                action: 'veh boosthorn',
                state: 'ON',
                configkey: 'BoostOnHorn',
            },
            {
                text: 'Boost Power',
                sub: 'vehicles.boostPower',
            },
        ];
    }

    getSpawnMenu(): MenuItem[] {
        return [
            {
                text: 'Spawn by Searching',
                sub: 'vehicles.spawn.search',
            },
            {
                text: 'Spawn Fun Stuff',
                sub: 'vehicles.spawn.fun',
            },
            {
                text: 'Spawn by Type',
                sub: 'vehicles.spawn.type',
            },
            {
                text: 'Spawn Vehicle by DLC',
                sub: 'vehicles.spawn.dlc',
            },
            {
                text: 'Spawn Vehicle by Internal Name',
                action: 'vehspawn input',
            },
            {
                text: 'Automatic Despawn',
                action: 'vehspawn despawn',
                state: 'ON',
                configkey: 'AutoDespawnVehicle',
            },
            {
                text: 'Spawn Inside Vehicle',
                action: 'vehspawn spawninveh',
                state: 'ON',
                configkey: 'SpawnInVehicle',
            },
        ];
    }

    getRainbowMenu(): MenuItem[] {
        return [
            {
                text: 'Rainbow Car',
                action: 'veh rainbowcar',
                state: 'OFF',
                configkey: 'RainbowPaint',
            },
            {
                text: 'Rainbow Chrome Car',
                action: 'veh rainbowchrome',
                state: 'OFF',
                configkey: 'RainbowChrome',
            },
            {
                text: 'Rainbow Neons',
                action: 'veh rainbowneon',
                state: 'OFF',
                configkey: 'RainbowNeon',
            },
            {
                text: 'Rainbow Neons (Inverse)',
                action: 'veh rainbowneoninverse',
                state: 'OFF',
                configkey: 'RainbowNeonInverse',
            },
            {
                text: 'Rainbow Speed',
                sub: 'vehicles.appearance.rainbowSettings.speed',
            },
        ];
    }

    getRainbowSpeedMenu(): MenuItem[] {
        const list = [];
        const config = getConfig();
        const defaultSpeed = 50;
        let current = defaultSpeed;

        if (config.has('RainbowSpeed', true)) {
            const configuredSpeed = Number.parseFloat(config.get('RainbowSpeed'));

            if (configuredSpeed > 0) {
                current = Math.round(configuredSpeed * 100);
            }
        }

        for (let speed = 0.1; speed <= 1; speed += 0.1) {
            speed = Number.parseFloat(speed.toFixed(1));
            const percentage = Math.round(100 * speed);

            let text = `${percentage}% Speed`;

            if (percentage === current) {
                text += ' (Current)';
            } else if (percentage === defaultSpeed) {
                text += ' (Default)';
            }

            list.push({
                text,
                action: `rainbowspeed ${speed}`,
            });
        }

        return list;
    }

    getAppearanceMenu(): MenuItem[] {
        return [
            {
                text: 'Both Custom Colour',
                sub: 'vehicles.appearance.customBothColour',
            },
            {
                text: 'Custom Primary Colour',
                sub: 'vehicles.appearance.customPrimaryColour',
            },
            {
                text: 'Custom Secondary Colour',
                sub: 'vehicles.appearance.customSecondaryColour',
            },
            {
                text: 'Both Paint Colour',
                sub: 'vehicles.appearance.bothColour',
            },
            {
                text: 'Paint Primary Colour',
                sub: 'vehicles.appearance.primaryColour',
            },
            {
                text: 'Paint Secondary Colour',
                sub: 'vehicles.appearance.secondaryColour',
            },
            {
                text: 'Pearlescent Colour',
                sub: 'vehicles.appearance.pearlescentColour',
            },
            {
                text: 'Rim Colour',
                sub: 'vehicles.appearance.rimColour',
            },
            {
                text: 'Dashboard Colour',
                sub: 'vehicles.appearance.dashColour',
            },
            {
                text: 'Trim Colour',
                sub: 'vehicles.appearance.trimColour',
            },
            {
                text: 'Colour Combinations',
                sub: 'vehicles.appearance.colourCombinations',
            },
            {
                text: 'Window Tint',
                sub: 'vehicles.appearance.windowTintSettings',
            },
            {
                text: 'Vehicle Livery',
                sub: 'vehicles.appearance.livery',
            },
            {
                text: 'Roof Livery',
                sub: 'vehicles.appearance.roofLivery',
            },
            {
                text: 'Number Plates',
                sub: 'vehicles.appearance.numberPlateSettings',
            },
            {
                text: 'Rainbow Car Settings',
                sub: 'vehicles.appearance.rainbowSettings',
            },
        ];
    }

    getModsMenu(): MenuItem[] {
        return [
            {
                text: 'Quick Upgrade',
                action: 'vehmod quickupgrade',
            },
            {
                text: 'Neons & Lights',
                sub: 'vehicles.mods.lights',
            },
            {
                text: 'Performance',
                sub: 'vehicles.mods.performance',
            },
            {
                text: 'Wheels & Tyres',
                sub: 'vehicles.mods.wheels',
            },
            {
                text: 'Other Mods',
                sub: 'vehicles.mods.other',
            }
        ];
    }

    getModWheelsMenu(): MenuItem[] {
        return [
            {
                text: 'Enable Tyre Smoke',
                action: 'vehmod tyresmokeon',
            },
            {
                text: 'Disable Tyre Smoke',
                action: 'vehmod tyresmokeoff',
            },
            {
                text: 'Tyre Smoke Colour',
                sub: 'vehicles.mods.wheels.tyreSmokeColour',
            },
        ]
    }

    getModPerformanceMenu(): MenuItem[] {
        return [
            {
                text: 'Add Turbo',
                action: 'vehmod turboon',
            },
            {
                text: 'Remove Turbo',
                action: 'vehmod turbooff',
            },
        ];
    }
}
