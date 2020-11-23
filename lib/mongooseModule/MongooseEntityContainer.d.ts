import { MongooseEntityContainerInterface } from "./MongooseEntityContainerInterface";
import { MongooseEntityInterface } from "./MongooseEntityInterface";
export declare class MongooseEntityContainer implements MongooseEntityContainerInterface {
    private entities;
    getEntityMap(): MongooseEntityInterface[];
    register(entity: MongooseEntityInterface): void;
}
