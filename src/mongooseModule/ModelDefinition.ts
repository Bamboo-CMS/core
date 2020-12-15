import mongoose, {Document, Model, Schema, SchemaDefinition, SchemaOptions} from 'mongoose';

export abstract class ModelDefinition {
    abstract getCollectionName(): string;

    abstract getSchemaDefinitions(): SchemaDefinition;

    abstract getSchemaOptions(): SchemaOptions;

    getModel<T extends Document>(): Model<T> {
        return mongoose.model<T>(this.getCollectionName(), new Schema(this.getSchemaDefinitions(), this.getSchemaOptions()));
    }
}