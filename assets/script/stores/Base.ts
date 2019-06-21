import { action } from "mobx";

export class Base {
    constructor() {
    }

    /**
     * @param json Object类型的JSON对象
     */
    @action
    updateData(json: any) {
        if (typeof json !== 'object') {
            return;
        }

        for (const key in json) {
            const value = json[key];
            // Object类型的JSON对象中的非基础类型只有 Array 和 Object，他们的类型字符串都是 'object'
            if (typeof value === 'object') {
                continue;
            }

            (this as any)[key] = value;
        }
    }
}
