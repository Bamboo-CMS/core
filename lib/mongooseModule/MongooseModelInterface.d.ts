import { Document, Schema } from "mongoose";
export interface MongooseModelInterface extends Document {
    getSchema(): Schema;
}
