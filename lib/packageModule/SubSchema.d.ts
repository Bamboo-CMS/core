import { ISubSchema } from "./ISubSchema";
import { GraphQLSchema } from "graphql";
export declare class SubSchema implements ISubSchema {
    schema: GraphQLSchema;
    constructor(schema: GraphQLSchema);
    getSchema(): GraphQLSchema;
    setSchema(schema: GraphQLSchema): void;
}
