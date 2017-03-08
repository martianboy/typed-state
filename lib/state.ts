import * as uniqueId from 'lodash/uniqueId';

import { IState, ICollection } from './definitions';
import { prop, session } from './decorators';

interface IStateOptions {
    parse?: boolean;
    parent?: IState | ICollection<State>;
    collection?: ICollection<State>;
    silent?: boolean;
    initial?: boolean;
}

export class State implements IState {
    cid: string;
    _events: Object = {};
    _values: Object = {};
    _changed: Object = {};

    parent?: IState | ICollection<State>;
    collection?: ICollection<State>;

    constructor(attrs?: Object, options: IStateOptions = {}) {
        this.cid || (this.cid = uniqueId('state'));

        if (options.parse) attrs = this.parse(attrs, options);
        this.parent = options.parent;

        if (attrs) this.set(attrs, Object.assign({silent: true, initial: true}, options));
        this.collection = options.collection;
    }

    parse(attrs: Object, options?: IStateOptions): Object {
        return attrs;
    }

    serialize(options?: Object) {
        var attrOpts = Object.assign({props: true}, options);

        return this._values;
    }

    set(attrs: Object, options?: any): this {
        for (var i = 0, keys = Object.keys(attrs), len = keys.length; i < len; i++) {
            const attr = keys[i];
            const newVal = attrs[attr];
            this._values[attr] = newVal;
        }

        return this;
    }
}

class Child extends State {
    @session()
    name: string;
}

const m = new Child({ name: 'Gholi' });
console.log(m);
m.name = 'Abbas';
console.log(m.name);
