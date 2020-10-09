export declare class Container {
    private readonly _containerItems;
    register(object: any, name: Symbol, tags?: string[]): void;
    get(name: Symbol): any | null;
    getByTag(tag: string): any[];
}
