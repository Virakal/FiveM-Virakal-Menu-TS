import { getClientIdFromServerId, getEntityPosition, setEntityPosition, notify, sendChatMessage, Vector3 } from 'utils';
import type Trainer from '../Trainer';
import type { Handler } from './Handler';

const TP_TO_PLAYER_ADDITIONAL_HEIGHT = 2.5;

export default class TeleportHandler implements Handler {
    trainer: Trainer;

    constructor(trainer: Trainer) {
        this.trainer = trainer;

        RegisterNuiCallback('coords', this.onCoords.bind(this));
        RegisterNuiCallback('teleplayer', this.onTelePlayer.bind(this));
        RegisterNuiCallback('teleport', this.onTeleport.bind(this));
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

        const newPosition = otherPos.withOffsetZ(TP_TO_PLAYER_ADDITIONAL_HEIGHT);
        setEntityPosition(playerPed, newPosition);

        const otherVehicle = GetVehiclePedIsIn(otherClientId, false);

        if (otherVehicle && AreAnyVehicleSeatsFree(otherVehicle)) {
            SetPedIntoVehicle(playerPed, otherVehicle, -2);
        }

        cb('ok');
        return cb;
    }

    onTeleport(data: NuiData, cb: NuiCallback): NuiCallback {
        const input = data.action.split(',').map((x: string) => Number.parseInt(x.trim(), 10));
        const coords = Vector3.fromArray(input);

        const ped = GetPlayerPed(-1);

        teleportPedWithVehicle(ped, coords);

        cb('ok');
        return cb;
    }
}
