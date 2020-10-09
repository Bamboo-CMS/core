import {GraphQLSchema} from "graphql";

export class SubSchema {
    private _schema: GraphQLSchema;

    constructor(schema: GraphQLSchema) {
        this._schema = schema;
    }

    get schema(): GraphQLSchema {
        return this._schema;
    }

    set schema(value: GraphQLSchema) {
        this._schema = value;
    }
}
