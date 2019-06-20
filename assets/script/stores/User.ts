import { Equip } from "./Equip";
import { Base } from "./Base";
import { observable, action } from "mobx";

export class User extends Base {
    @observable id: number = -1;
    @observable name: string = '';

    @observable equips: Equip[] = [];

    constructor(json: any) {
        super();

        this.updateData(json);
    }

    @action
    updateData(json: any) {
        super.updateData(json);

        json.equips.forEach((e: any) => {
            this.equips.push(new Equip(e));
        });
    }
}
