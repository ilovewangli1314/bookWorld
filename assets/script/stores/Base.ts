import { action } from "mobx";

export class Base {
    constructor() {
    }

    @action
    updateData(json: any) {
        if (typeof json !== 'object') {
            return;
        }

        for (const key in json) {
            const value = json[key];
            if (typeof value === "object") {
                continue;
            }

            (this as any)[key] = value;
        }
    }
}
