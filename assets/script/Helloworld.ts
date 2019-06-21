import { observer, render, react, reactor } from './utils/mobx/observer';
import { runInAction, observable, action } from "mobx";
import { canvas } from './stores';
import { User } from './stores/User';

// import { pbgame } from "./protos/game";

import exampleApi from "./api/example";

const { ccclass, property } = cc._decorator;

@ccclass
@observer
export class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null as any;

    @property
    text: string = 'hello';

    @observable
    _usr: User = null as any;

    @action
    async start() {
        // init logic
        this.label.string = this.text;

        // this.schedule(() => {
        //     runInAction(() => {
        //         canvas.base.x += 1;
        //     })
        // }, 1);
        // this.schedule(() => canvas.move(1, 0), 1);

        // const obj = {Id: 1, Hp: 2, Mp: 3, Attack: 4, Defense:5 };
        // const heroObj = pbgame.Hero.fromObject(obj);
        // const heroJson = pbgame.Hero.toObject(heroObj);
        // const heroStr = JSON.stringify(heroJson);
        // cc.log('heroStr:', heroStr);

        const obj = { id: 1, name: 'jg', equips: [{ id: 1, name: 'hat' }, { id: 2, name: 'arm' }] };
        const usr = this._usr = new User(obj);
        cc.log('usr:' + usr.id + usr.name);

        // this.schedule(() => {
        //     runInAction(() => {
        //         usr.equips[0].name += '1';
        //     })
        // }, 1);
        // try {
        //     const res = await exampleApi.test(1);
        //     cc.log('success res:', res);
        // } catch (e) {
        //     cc.log('error res:', e.message);
        // }

        try {
            const res = await exampleApi.test(1);
            if (res.code === 0) {
                runInAction(() => {
                    // this.data = res.data;
                    // this.state = 'done';
                    cc.log('on res code === 0');
                });
            }
            else {
                runInAction(() => {
                    // this.state = 'error';
                    // Toast.info(res.msg);
                    cc.log('on res code !== 0');
                });
            }
        } catch (e) {
            runInAction(() => {
                //   this.state = 'error';
                cc.log('on catch error!');
            });
        }
    }

    @render
    render() {
        this.label.string = "canvas x:" + canvas.base.x;
    }

    @render
    updateUser() {
        if (this._usr) {
            cc.log('usr equip:', this._usr.equips[0].name);
        }
    }

    @reactor
    reactor() {
        return react(() => canvas.base.x, x => {
            cc.log('canvas.base.x:', x);
        });
    }

    // @reactor
    // reactorForUser() {
    //     return react(() => this._usr.name, name => {
    //         cc.log('usr:', name);
    //     });
    // }
}
