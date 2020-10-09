import { IPackage } from "./IPackage";
import { IResolvers } from 'graphql-tools';
import { GraphQLSchema } from "graphql";
import { SubSchema } from "./SubSchema";
export interface IPackageContainer {
    registerPackage(bambooPackage: IPackage): void;
    removePackage(bambooPackage: IPackage): void;
    registerResolver(resolver: IResolvers): void;
    getGraphQLSchemas(): GraphQLSchema[];
    getSubSchemas(): SubSchema[];
    addGraphQLSchema(GraphQLSchema: GraphQLSchema): void;
    initializesPackages(): void;
}
