import {ContainerItem} from "./ContainerItem";

export class Container {
    private readonly _containerItems: ContainerItem[] = [];

    public register(object: any, name: Symbol, tags: string[] = []): void {
        this._containerItems.push(new ContainerItem(object, name, tags));
    }

    public get(name: Symbol): any|null {
        return this._containerItems.find(item => item.name === name);
    }

    public getByTag(tag: string): any[] {
        const items = this._containerItems.filter(item => item.tags.some(itemTag => itemTag === tag));

        return items.map(item => item.object);
    }
}