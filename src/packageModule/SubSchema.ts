import {ISubSchema} from "./ISubSchema";
import {GraphQLSchema} from "graphql";

export class SubSchema implements ISubSchema {
    schema: GraphQLSchema;

    constructor(schema: GraphQLSchema) {
        this.schema = schema;
    }

    getSchema():GraphQLSchema {
        return this.schema;
    }

    setSchema(schema: GraphQLSchema) {
        this.schema = schema;
    }
}
