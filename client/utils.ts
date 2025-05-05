import isPromise from "is-promise";

export class Vector3 {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static fromArray(args: number[]): Vector3 {
        return new Vector3(args[0], args[1], args[2]);
    }

    static fromObject(obj: { x: number, y: number, z: number }): Vector3 {
        return new Vector3(obj.x, obj.y, obj.z);
    }

    toString(floatPrecision: number = 2): string {
        return [this.x, this.y, this.z].map((n) => n.toFixed(floatPrecision)).join(', ');
    }

    toArray(): number[] {
        return [this.x, this.y, this.z];
    }

    apply<T>(callback: (x: number, y: number, z: number) => T, context: any = null): T {
        return callback.apply(context ?? this, this.toArray());
    }

    withX(value: number): Vector3 {
        return this.with('x', value);
    }

    withY(value: number): Vector3 {
        return this.with('y', value);
    }

    withZ(value: number): Vector3 {
        return this.with('z', value);
    }

    withOffsetX(offset: number): Vector3 {
        return this.withX(this.x + offset);
    }

    withOffsetY(offset: number): Vector3 {
        return this.withY(this.y + offset);
    }

    withOffsetZ(offset: number): Vector3 {
        return this.withZ(this.z + offset);
    }

    private with(key: string, value: number): Vector3 {
        const args = ['x', 'y', 'z'].map((k) => key.toLowerCase() === k ? value : this[k as keyof this]);
        return Vector3.fromArray(args as number[]);
    }
}

export function notify(message: string, isImportant = false, showOnInfoTab = false) {
    SetNotificationTextEntry('STRING');
    AddTextComponentString(message);
    DrawNotification(isImportant, showOnInfoTab);
}

export async function loadModel(model: string | number): Promise<boolean> {
    // TODO: Add timeout
    console.log(`Loading model ${model}...`);

    RequestModel(model);

    while (!HasModelLoaded(model)) {
        await delay(1);
    }

    console.log(`Loaded model ${model}...`);

    return true;
}

export function sendUIMessage(message: object) {
    SendNUIMessage(message);
}

export function delay(ms: number): Promise<CitizenTimer> {
    return new Promise(res => setTimeout(res, ms, null));
}

export function sendChatMessage(message: string, name: string | null = null, multiline: boolean = true, colour: number[] = [255, 255, 255]) {
    emit('chat:addMessage', {
        color: colour,
        multiline,
        args: [name ?? GetPlayerName(PlayerId()), message],
    });
}

export function getClientIdFromServerId(playerId: number): number | null {
    const players = GetActivePlayers();

    for (const player of players) {
        const serverId = GetPlayerServerId(player);

        if (serverId === playerId) {
            return player;
        }
    }

    return null;
}

export function getEntityPosition(entity: number): Vector3 {
    return Vector3.fromArray(GetEntityCoords(entity, true));
}

export function setEntityPosition(entity: number, position: Vector3, ragdoll = false, clearArea = false, deadFlag = false): void {
    SetEntityCoords(entity, position.x, position.y, position.z, false, deadFlag, ragdoll, clearArea)
}

export function teleportPedWithVehicle(ped: number, position: Vector3): void {
    const vehicle = GetVehiclePedIsIn(ped, false);
    let entity = ped;

    // If we're in the driver's seat of a vehicle, teleport the whole vehicle
    if (vehicle && GetPedInVehicleSeat(vehicle, -1) === ped) {
        entity = vehicle;
    }

    setEntityPosition(entity, position);
}

export async function withModel(model: number, callback: (model: number, loaded: boolean) => any) {
    async function* context(callback: (model: number, loaded: boolean) => any): AsyncGenerator<CitizenImmediate> {
        try {
            const loaded = await loadModel(model);

            if (isPromise(callback)) {
                yield setImmediate(async () => await callback(model, loaded));
            } else {
                yield setImmediate(() => callback(model, loaded));
            }
        } finally {
            SetModelAsNoLongerNeeded(model);
        }
    }

    return await context(callback).next();
}

export function getWaypoint(): number | null {
    const blipType = 8;
    const blip = GetFirstBlipInfoId(blipType);
    return blip > 0 ? blip : null;
}

export function getWaypointPosition(): Vector3 | null {
    const waypoint = getWaypoint();

    if (!waypoint) {
        return null;
    }

    const coords = GetBlipCoords(waypoint);
    return Vector3.fromArray(coords);
}
