import { PedModelType } from "./PedModelList";

export default class PedModelListItem {
    name: string;
    image?: string;
    model: string;
    type: PedModelType = PedModelType.Human;
    tags?: object = {};

    private hash: number;

    get modelHash(): number {
        if (!this.hash) {
            this.hash = GetHashKey(this.model);
        }

        return this.hash;
    }

    hasTag(tag: string) {
        return this.tags && tag in Object.keys(this.tags);
    }
}
