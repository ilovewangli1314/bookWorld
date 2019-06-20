import { Base } from "./Base";
import { observable, action } from "mobx";

export class Equip extends Base {
    @observable id: number = -1;
    @observable name: string = '';

    constructor(json: any) {
        super();

        this.updateData(json);
    }

    @action
    updateData(json: any) {
        super.updateData(json);
    }
}
