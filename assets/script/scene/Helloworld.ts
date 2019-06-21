import BaseUI, { EnumUIPath } from "../utils/uikiller/BaseUI";
import Sequence from "../utils/action/Sequence";
import { TipMgr } from "../manager/TipManager";
import { ListenerMgr } from "../manager/ListenerManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends BaseUI {
    protected static className = "Helloworld";

    protected static uiDir = EnumUIPath.none;

    start() {

        let sequ = Sequence.create();
        let action: cc.ActionInterval = sequ.delay(5).event(() => {
            TipMgr.Instance().create("hello sequence");
        }).action();
        this.node.runAction(action);
        let testMap = new Map<string, number>();
        testMap.set('a', 1);
        testMap.set('b', 2);
        testMap.forEach((value, key) => {
            TipMgr.Instance().create(`value=${value},key=${key}`);
        });

    }

    onEnable() {
        super.onEnable();
        console.log('onEnable helloworld');
    }

    registerEvent() {
        ListenerMgr.Instance().on('test', this, (data) => {
            console.log('test', data, this);
        });
    }
}
