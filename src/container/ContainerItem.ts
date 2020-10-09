export class ContainerItem<T> {
    private readonly _object: T;
    private readonly _name: Symbol;
    private readonly _tags: string[];

    constructor(object: T, name: Symbol, tags: string[]) {
        this._object = object;
        this._name = name;
        this._tags = tags;
    }

    get object(): T {
        return this._object;
    }

    get name(): Symbol {
        return this._name;
    }

    get tags(): string[] {
        return this._tags;
    }
}