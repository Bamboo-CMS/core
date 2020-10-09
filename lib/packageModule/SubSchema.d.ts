import { GraphQLSchema } from "graphql";
export declare class SubSchema {
    private _schema;
    constructor(schema: GraphQLSchema);
    get schema(): GraphQLSchema;
    set schema(value: GraphQLSchema);
}
