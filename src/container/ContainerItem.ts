export class ContainerItem {
    private readonly _object: any;
    private readonly _name: Symbol;
    private readonly _tags: string[];

    constructor(object: any, name: Symbol, tags: string[]) {
        this._object = object;
        this._name = name;
        this._tags = tags;
    }

    get object(): any {
        return this._object;
    }

    get name(): Symbol {
        return this._name;
    }

    get tags(): string[] {
        return this._tags;
    }
}