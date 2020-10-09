import { IPackageContainer } from "./IPackageContainer";
import { IPackage } from "./IPackage";
import { IResolvers } from 'graphql-tools';
import { IResolverContainer } from "../resolverModule/IResolverContainer";
import { GraphQLSchema } from "graphql";
import { SubSchema } from "./SubSchema";
export declare class PackageContainer implements IPackageContainer {
    private static instance;
    private packages;
    private packagesInitialized;
    private readonly resolverContainer;
    private graphQLSchemas;
    private constructor();
    static getInstance(resolverContainer?: IResolverContainer | null): PackageContainer;
    initializesPackages(): void;
    registerPackage(bambooPackage: IPackage): void;
    removePackage(bambooPackage: IPackage): void;

    registerResolver(resolver: IResolvers): void;
    getResolverMap(): IResolvers | undefined;
    getGraphQLSchemas(): GraphQLSchema[];
    getSubSchemas(): SubSchema[];
    addGraphQLSchema(graphQLSchema: GraphQLSchema): void;
}
