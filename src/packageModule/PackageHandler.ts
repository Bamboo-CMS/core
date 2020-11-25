import {Package} from "./Package";
import {IResolvers, mergeSchemas} from 'graphql-tools';
import {GraphQLSchema} from "graphql";
import { core } from "../Core";
import merge from "lodash.merge";
import { IExecutableSchemaDefinition, makeExecutableSchema } from '@graphql-tools/schema';

export const packageHandlerContainerName = Symbol('packageHandler');
export const packageHandlerContainerTags: string[] = ['packageHandler'];

export class PackageHandler {

    /**
     * The package tag is required to find all package entries.
     */
    private readonly defaultPackageContainerTag: string = 'package';

    /**
     * The resolver tag is required to find all resolver entries.
     */
    private readonly defaultResolverContainerTag: string = 'resolver';

    /**
     * The graphql tag is required to find all graphql schemas entries.
     */
    private readonly defaultGraphQLSchemaContainerTag: string = 'graphQLSchema';

    private _packagesInitialized: boolean = false;

    initializesPackages(): void {
        if (this._packagesInitialized) {
            return;
        }

        // Register each package.
        for (let bambooPackage of this.packages) {
            bambooPackage.register();
        }

        // Start each package.
        for (let bambooPackage of this.packages) {
            bambooPackage.start();
        }

        this._packagesInitialized = true;
    }

    registerPackage(bambooPackage: Package, name: Symbol, tags: string[] = []): void {
        core.container.register(bambooPackage, name, [
            ...tags,
            this.defaultPackageContainerTag
        ]);
    }

    addResolver(resolver: IResolvers, name: Symbol, tags: string[] = []): void {
        core.container.register(resolver, name, [
            ...tags,
            ...[this.defaultResolverContainerTag]
        ]);
    }

    addGraphQLSchemaDefinition(graphQLSchemaDefinition: IExecutableSchemaDefinition, name: Symbol, tags: string[] = []): void {
        core.container.register(makeExecutableSchema(graphQLSchemaDefinition), name, [
            ...tags,
            ...[this.defaultGraphQLSchemaContainerTag]
        ]);
    }

    private getResolverMap(): IResolvers | undefined {
        if (this.resolvers.length <= 0) {
            return undefined;
        }

        return this.resolvers.reduce((curr, resolver) => merge(curr, resolver), {});
    }

    getMergedSchema(): GraphQLSchema {
        return mergeSchemas({
            schemas: this.graphQLSchemas,
            resolvers: this.getResolverMap()
        })
    }

    get graphQLSchemas(): GraphQLSchema[] {
        return core.container.getByTags([this.defaultGraphQLSchemaContainerTag]);
    }

    get resolvers(): IResolvers[] {
        return core.container.getByTags([this.defaultResolverContainerTag]);
    }

    get packages(): Package[] {
        return core.container.getByTags([this.defaultPackageContainerTag]);
    }
}