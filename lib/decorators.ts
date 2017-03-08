import { IPropOptions, IState } from './definitions';

function propDectorator<T>(options?: IPropOptions<T>) {
    return function(cls: IState, name: string) {
        function getter(): T {
            console.log('getter');
            console.log(this);
            return this._values[name];
        }

        function setter(value: T) {
            console.log('setter');
            console.log(this);
            this.set({[name]: value});
        }

        if (delete cls[name]) {
            // Create new property with getter and setter
            Object.defineProperty(cls, name, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    }
}

export function prop<T>(options?: IPropOptions<T>) {
    return propDectorator<T>(Object.assign({}, options, { session: false }));
}

export function session<T>(options?: IPropOptions<T>) {
    return propDectorator<T>(Object.assign({}, options, { session: true }));
}
