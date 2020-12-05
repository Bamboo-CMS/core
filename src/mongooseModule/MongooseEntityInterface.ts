import {Model, Schema, Document} from "mongoose";

export interface MongooseEntityInterface  {
    getSchema(): Schema;
    getModel<T extends Document>(): Model<T>;
}
