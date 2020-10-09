import { ContainerItem } from "./ContainerItem";
export declare class Container {
    protected readonly _containerItems: ContainerItem<any>[];
    register<T>(object: T, name: Symbol, tags: string[]): void;
    get<T>(name: Symbol): T | null;
    getByTags<T>(tags: string[]): T[];
    unregister(name: Symbol): void;
}
