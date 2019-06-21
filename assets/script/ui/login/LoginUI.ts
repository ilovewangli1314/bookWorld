import { UIComponent } from "../../Utils/UIKiller/UIComponent";
import { EnumUIPath, UIShowType } from "../../utils/uikiller/BaseUI";
import { UIMgr } from "../../manager/UIManager";
import { TipBoxUI } from "../Common/TipBoxUI";
import LoadingMgr from "../../manager/LoadingManager";
import Sequence from "../../utils/action/Sequence";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoginUI extends UIComponent {
    protected static className = "LoginUI";
    protected static uiPath = EnumUIPath.hall;

    onEnable() {
    }

    _onWeixinTouchEnd(event) {
        console.log("_onWeixinTouchEnd", event);
        UIMgr.Instance().openUI(TipBoxUI, UIShowType.none);
        // LoadingMgr.Instance().close();
    }

    _onAgreeToggleEnd(event) {
        console.log("_onToggleEnd", event);
        // LoadingMgr.Instance().create();

        // let action = Sequence.create().delay(5).event(() => {
        //     LoadingMgr.Instance().close()
        // }).action();
        // this.node.runAction(action);
    }

    // update (dt) {}
}
