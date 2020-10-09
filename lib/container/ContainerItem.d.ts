export declare class ContainerItem<T> {
    private readonly _object;
    private readonly _name;
    private readonly _tags;
    constructor(object: T, name: Symbol, tags: string[]);
    get object(): T;
    get name(): Symbol;
    get tags(): string[];
}
