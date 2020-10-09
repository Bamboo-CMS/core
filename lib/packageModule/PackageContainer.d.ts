import { IPackageContainer } from "./IPackageContainer";
import { IPackage } from "./IPackage";
import { IResolvers } from 'graphql-tools';
import { GraphQLSchema } from "graphql";
import { SubSchema } from "./SubSchema";
export declare class PackageContainer implements IPackageContainer {
    private static readonly _name;
    private packages;
    private packagesInitialized;
    private graphQLSchemas;
    initializesPackages(): void;
    registerPackage(bambooPackage: IPackage): void;
    removePackage(bambooPackage: IPackage): void;
    registerResolver(resolver: IResolvers): void;
    getGraphQLSchemas(): GraphQLSchema[];
    getSubSchemas(): SubSchema[];
    addGraphQLSchema(graphQLSchema: GraphQLSchema): void;
    static getName(): Symbol;
}
