import { MongooseEntityInterface } from "./MongooseEntityInterface";
export interface MongooseEntityContainerInterface {
    getEntityMap(): MongooseEntityInterface[];
    register(entity: MongooseEntityInterface): void;
}
