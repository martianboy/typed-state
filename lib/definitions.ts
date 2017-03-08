export interface IPropOptions<T> {
    defaultValue: T;
    serializedName: string;
    session: boolean;
}

export interface ICollection<Model extends IState> {
    mainIndex?: string;
    models: Model[];
    parse(res: Object, options?: any): Object;
    serialize(options?: any): Object
}

export interface IState {
    _values: any;
    collection?: ICollection<IState>;
    parent?: IState | ICollection<IState>;
    set(attrs: Object, options?: any): this;
    serialize(options?: Object);
}