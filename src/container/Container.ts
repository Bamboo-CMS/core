import {ContainerItem} from "./ContainerItem";

export class Container {
    protected readonly _containerItems: ContainerItem[] = [];

    public register(object: any, name: Symbol, tags: string[]): void {
        this._containerItems.push(new ContainerItem(object, name, tags));
    }

    public get(name: Symbol): any|null {
        return this._containerItems.find(item => item.name === name);
    }

    public getByTags(tags: string[]): any[] {
        const items = this._containerItems.filter(item => item.tags.some(itemTag => tags.some(subTag => itemTag === subTag)));

        return items.map(item => item.object);
    }

    public unregister(name: Symbol) {
        const index = this._containerItems.findIndex(item => item.name === name);

        if (index !== -1) {
            this._containerItems.splice(index, 1);
        }
    }
}