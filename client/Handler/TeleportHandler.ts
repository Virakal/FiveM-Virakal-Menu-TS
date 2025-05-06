import {
    getClientIdFromServerId,
    getEntityPosition,
    getWaypointPosition,
    notify,
    sendChatMessage,
    setEntityPosition,
    teleportPedWithVehicle,
    teleportToGroundHeight,
    Vector3,
} from '@shared/utils';

const TP_TO_PLAYER_ADDITIONAL_HEIGHT = 2.5;
const TP_TO_WAYPOINT_ADDITIONAL_HEIGHT = 2.5;

export default class TeleportHandler implements Handler {
    constructor() {
        RegisterNuiCallback('coords', this.onCoords);
        RegisterNuiCallback('teleplayer', this.onTelePlayer);
        RegisterNuiCallback('teleport', this.onTeleport);
        RegisterNuiCallback('telelastcar', this.onTeleLastCar);
        RegisterNuiCallback('telewaypoint', this.onTeleWaypoint);
    }

    onCoords(data: NuiData, cb: NuiCallback): NuiCallback {
        const ped = PlayerPedId();
        const coords = getEntityPosition(ped);

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

    onTeleLastCar(data: NuiData, cb: NuiCallback): NuiCallback {
        const ped = PlayerPedId();
        const currentVehicle = GetVehiclePedIsIn(ped, false);
        const lastVehicle = GetPlayersLastVehicle();
        let errorMessage;

        if (currentVehicle) {
            errorMessage = 'You can\'t teleport to a new vehicle while you\'re already in a vehicle.';
        } else if (!lastVehicle) {
            errorMessage = 'Last vehicle not found.';
        } else if (!AreAnyVehicleSeatsFree(lastVehicle)) {
            errorMessage = 'Last vehicle has no free seats.';
        } else {
            SetPedIntoVehicle(ped, lastVehicle, -2);
        }

        if (errorMessage) {
            notify(`~r~${errorMessage}`);
        }

        cb('ok');
        return cb;
    }

    onTeleport(data: NuiData, cb: NuiCallback): NuiCallback {
        const input = data.action.split(',').map((x: string) => Number.parseInt(x.trim(), 10));
        const coords = Vector3.fromArray(input);

        const ped = PlayerPedId();

        teleportPedWithVehicle(ped, coords);

        cb('ok');
        return cb;
    }

    async onTeleWaypoint(data: NuiData, cb: NuiCallback): Promise<NuiCallback> {
        const waypointPosition = getWaypointPosition();

        cb('ok');

        if (!waypointPosition) {
            notify('~r~No waypoint is set!');
            return cb;
        }

        const ped = PlayerPedId();
        teleportToGroundHeight(ped, waypointPosition, true, TP_TO_WAYPOINT_ADDITIONAL_HEIGHT);

        return cb;
    }
}
