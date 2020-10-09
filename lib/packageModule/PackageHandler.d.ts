import { PackageInterface } from "./PackageInterface";
import { IResolvers } from 'graphql-tools';
import { GraphQLSchema } from "graphql";
import { SubSchema } from "./SubSchema";
export declare const packageHandlerContainerName: unique symbol;
export declare const packageHandlerContainerTags: string[];
export declare class PackageHandler {
    private readonly defaultPackageContainerTag;
    private readonly defaultResolverContainerTag;
    private readonly defaultGraphQLSchemaContainerTag;
    private packagesInitialized;
    initializesPackages(): void;
    registerPackage(bambooPackage: PackageInterface, name: Symbol, tags?: string[]): void;
    addResolver(resolver: IResolvers, name: Symbol, tags?: string[]): void;
    addGraphQLSchema(graphQLSchema: GraphQLSchema, name: Symbol, tags?: string[]): void;
    getResolverMap(): IResolvers | null;
    getSubSchemas(): SubSchema[];
    get graphQLSchemas(): GraphQLSchema[];
    get resolvers(): IResolvers[];
    get packages(): PackageInterface[];
}
