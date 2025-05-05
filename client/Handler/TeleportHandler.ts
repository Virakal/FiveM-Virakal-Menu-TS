import { getClientIdFromServerId, getEntityPosition, setEntityPosition, notify, sendChatMessage } from 'utils';
import type Trainer from '../Trainer';
import type { Handler } from './Handler';

const TP_TO_PLAYER_ADDITIONAL_HEIGHT = 2.5;

export default class TeleportHandler implements Handler {
    trainer: Trainer;

    constructor(trainer: Trainer) {
        this.trainer = trainer;

        RegisterNuiCallback('coords', this.onCoords.bind(this));
        RegisterNuiCallback('teleplayer', this.onTelePlayer.bind(this));
    }

    onCoords(data: NuiData, cb: NuiCallback): NuiCallback {
        const playerPed = GetPlayerPed(-1);
        const coords = getEntityPosition(playerPed);

        notify(`~g~${coords}`);
        sendChatMessage(coords.toString());

        cb('ok');
        return cb;
    }

    onTelePlayer(data: NuiData, cb: NuiCallback): NuiCallback {
        const playerClientId = PlayerId();
        const playerServerId = GetPlayerServerId(playerClientId);
        const otherServerId = Number.parseInt(data.action, 10);
        const otherClientId = getClientIdFromServerId(otherServerId);

        console.log(`Teleporting ${playerServerId} (${playerClientId}) to ${otherServerId} (${otherClientId}).`);

        let errorMessage: string | null = null;

        if (playerServerId === otherServerId) {
            errorMessage = `Player ${otherServerId} is you!`;
        } else if (otherClientId === null) {
            errorMessage = `Player ${otherServerId} was not found!`;
        }

        if (errorMessage) {
            notify(`~r~${errorMessage}`);
            cb('ok');
            return cb;
        }

        const playerPed = GetPlayerPed(playerClientId);
        const otherPed = GetPlayerPed(otherClientId);
        const otherPos = getEntityPosition(otherPed);
        const otherName = GetPlayerName(otherClientId);

        otherPos.apply(RequestCollisionAtCoord);

        notify(`Teleporting to ${otherName} (Player ${otherServerId})...`);

        const newPosition = otherPos.withZ(otherPos.z + TP_TO_PLAYER_ADDITIONAL_HEIGHT);
        setEntityPosition(playerPed, newPosition);

        const otherVehicle = GetVehiclePedIsIn(otherClientId, false);

        if (otherVehicle && AreAnyVehicleSeatsFree(otherVehicle)) {
            SetPedIntoVehicle(playerPed, otherVehicle, -2);
        }

        cb('ok');
        return cb;
    }
}
