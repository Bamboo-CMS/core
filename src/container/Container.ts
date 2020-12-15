import {ContainerItem} from "./ContainerItem";

export class Container {
    protected readonly _containerItems: ContainerItem<any>[] = [];

    public register<T>(object: T, name: string, tags: string[] = []): void {
        // Emit if there's an object with the same name.
        const existingObject = this.get(name);

        if (existingObject) {
            // Find and remove the existing one.
            const containerItemIndex = this._containerItems.findIndex(item => item.name === name);

            if (containerItemIndex !== -1) {
                this._containerItems.splice(containerItemIndex, 1);
            }
        }

        this._containerItems.push(new ContainerItem(object, name, tags));
    }

    public get<T>(name: string): T | null {
        const item = this._containerItems.find(item => item.name === name);

        return item ? item.object : null;
    }

    public getByTags<T>(tags: string[]): T[] {
        const items = this._containerItems.filter(item => item.tags.some((itemTag: string) => tags.some((subTag: string) => itemTag === subTag)));

        return items.map(item => item.object);
    }

    public unregister(name: string) {
        const index = this._containerItems.findIndex(item => item.name === name);

        if (index !== -1) {
            this._containerItems.splice(index, 1);
        }
    }
}