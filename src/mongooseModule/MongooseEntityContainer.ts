import {MongooseEntityContainerInterface} from "./MongooseEntityContainerInterface";
import {MongooseEntityInterface} from "./MongooseEntityInterface";

export class MongooseEntityContainer implements MongooseEntityContainerInterface {
    private entities: MongooseEntityInterface[] = [];

    getEntityMap(): MongooseEntityInterface[] {
        return this.entities;
    }

    register(entity: MongooseEntityInterface): void {
        this.entities.push(entity);
    }
}