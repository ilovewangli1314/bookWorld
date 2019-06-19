import { observer, render } from './utils/mobx/observer';
import { canvas } from './stores';

const { ccclass, property } = cc._decorator;

@ccclass
@observer
export class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null as any;

    @property
    text: string = 'hello';

    start() {
        // init logic
        this.label.string = this.text;

        this.schedule(() => canvas.move(1, 0), 1);
    }

    @render
    render() {
        this.label.string = "canvas x:" + canvas.base.x;
    }
}
