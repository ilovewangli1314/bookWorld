/**
 * 动作序列类的封装，支持使用链式调用添加各种类型的动作。
 * 对 cc.DelayTime 和 cc.CallFunc 类型动作的添加做了进一步的封装简化。
 */
export default class Sequence {
    public static create(): Sequence {
        return new Sequence();
    }

    private _sequenArr: cc.FiniteTimeAction[] = [];

    /**
     * 添加一个延时动作
     * @param time 延迟时间(单位:秒)
     */
    public delay(time: number): Sequence {
        this._sequenArr.push(cc.delayTime(time));
        return this;
    }

    /**
     * 添加一个回调
     * @param call 类型为'Function'的回调函数
     */
    public event(call: Function): Sequence {
        this._sequenArr.push(cc.callFunc(call));
        return this;
    }

    /**
     * 添加一个时间间隔动作
     * @param action 时间间隔类型动作
     */
    public add(action: cc.ActionInterval) {
        this._sequenArr.push(action);
        return this;
    }

    /**
     * @returns 返回引擎中的序列动作实例结果，用于执行动作
     */
    public action(): cc.ActionInterval {
        return cc.sequence(this._sequenArr);
    }
}
