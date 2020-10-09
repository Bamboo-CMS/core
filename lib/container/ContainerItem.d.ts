export declare class ContainerItem {
    private readonly _object;
    private readonly _name;
    private readonly _tags;
    constructor(object: any, name: Symbol, tags: string[]);
    get object(): any;
    get name(): Symbol;
    get tags(): string[];
}
