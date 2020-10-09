import { Package } from "./Package";
import { IResolvers } from 'graphql-tools';
import { GraphQLSchema } from "graphql";
import { SubSchema } from "./SubSchema";
export declare const packageHandlerContainerName: unique symbol;
export declare const packageHandlerContainerTags: string[];
export declare class PackageHandler {
    private readonly defaultPackageContainerTag;
    private readonly defaultResolverContainerTag;
    private readonly defaultGraphQLSchemaContainerTag;
    private _packagesInitialized;
    initializesPackages(): void;
    registerPackage(bambooPackage: Package, name: Symbol, tags?: string[]): void;
    addResolver(resolver: IResolvers, name: Symbol, tags?: string[]): void;
    addGraphQLSchema(graphQLSchema: GraphQLSchema, name: Symbol, tags?: string[]): void;
    getResolverMap(): IResolvers | null;
    getSubSchemas(): SubSchema[];
    get graphQLSchemas(): GraphQLSchema[];
    get resolvers(): IResolvers[];
    get packages(): Package[];
}
