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
