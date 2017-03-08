import * as uniqueId from 'lodash/uniqueId';

import { IState, ICollection } from './definitions';
import { prop, session } from './decorators';
import { State } from './state';

interface ICollectionOptions {
    parse?: boolean;
    silent?: boolean;
    add?: boolean;
    merge?: boolean;
    remove?: boolean;
}

class Collection<Model extends State> implements ICollection<Model> {
    mainIndex: string;
    models: Model[];

    isModel(model) {
        return model instanceof State;
    }

    map<T>(mapperFn: (model?: Model, index?: number, self?: this) => T): T[] {
        return this.models.map<T>((value: Model, index: number, array: Model[]) => {
            return mapperFn(value, index, this);
        });
    }

    parse(attrs: any, options?: Object): Object[] {
        return attrs;
    }

    serialize(options?: Object): Object[] {
        const res = this.map<Object>(model => model.serialize(options));

        return res;
    }

    set(models: any, options?: ICollectionOptions) {
        options = Object.assign({add: true, remove: true, merge: true}, options);
        if (options.parse) models = this.parse(models, options);

        var toAdd = [], toRemove = [], modelMap = {};
        var add = options.add, merge = options.merge, remove = options.remove;

        for (let i = 0, length = models.length; i < length; i++) {
            let attrs = models[i] || {};
            let id, model;

            if (this.isModel(attrs)) {
                id = model = attrs;
            } else {
                id = attrs[this.mainIndex];
            }
        }
    }
}
