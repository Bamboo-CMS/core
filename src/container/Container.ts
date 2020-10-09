import {ContainerItem} from "./ContainerItem";

export class Container {
    protected readonly _containerItems: ContainerItem<any>[] = [];

    public register<T>(object: T, name: Symbol, tags: string[]): void {
        this._containerItems.push(new ContainerItem(object, name, tags));
    }

    public get<T>(name: Symbol): T | null {
        return this._containerItems.find(item => item.name === name)?.object;
    }

    public getByTags<T>(tags: string[]): T[] {
        const items = this._containerItems.filter(item => item.tags.some((itemTag: string) => tags.some(subTag => itemTag === subTag)));

        return items.map(item => item.object);
    }

    public unregister(name: Symbol) {
        const index = this._containerItems.findIndex(item => item.name === name);

        if (index !== -1) {
            this._containerItems.splice(index, 1);
        }
    }
}