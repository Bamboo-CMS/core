export class ContainerItem<T> {
    private readonly _object: T;
    private readonly _name: string;
    private readonly _tags: string[];

    constructor(object: T, name: string, tags: string[]) {
        this._object = object;
        this._name = name;
        this._tags = tags;
    }

    get object(): T {
        return this._object;
    }

    get name(): string {
        return this._name;
    }

    get tags(): string[] {
        return this._tags;
    }
}