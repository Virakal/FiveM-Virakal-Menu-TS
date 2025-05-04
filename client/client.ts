console.log("[virakal-menu] Client Resource Started");

import Trainer from "Trainer";

export function Delay(ms: number): Promise<CitizenTimer> {
    return new Promise(res => setTimeout(res, ms, null));
}
