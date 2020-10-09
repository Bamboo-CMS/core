import { Model, Schema } from "mongoose";
export interface MongooseEntityInterface {
    getSchema(): Schema;
    getModel(): Model<any>;
}
