import { ContainerItem } from "./ContainerItem";
export declare class Container {
    protected readonly _containerItems: ContainerItem<any>[];
    register(object: any, name: Symbol, tags: string[]): void;
    get(name: Symbol): any | null;
    getByTags(tags: string[]): any[];
    unregister(name: Symbol): void;
}
