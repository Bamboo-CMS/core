import {Package} from "./Package";
import {IResolvers} from 'graphql-tools';
import {GraphQLSchema} from "graphql";
import {SubSchema} from "./SubSchema";
import { core } from "../Core";
import merge from "lodash.merge";

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
     * The graphql tag is required to find all graphql schema entries.
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

    addGraphQLSchema(graphQLSchema: GraphQLSchema, name: Symbol, tags: string[] = []): void {
        core.container.register(graphQLSchema, name, [
            ...tags,
            ...[this.defaultGraphQLSchemaContainerTag]
        ]);
    }

    getResolverMap(): IResolvers | null {
        if (this.resolvers.length <= 0) {
            return null;
        }

        // Merge the resolvers.
        const mergedResolvers = {};

        this.resolvers.forEach(resolver => merge(mergedResolvers, resolver));

        return mergedResolvers;
    }

    getSubSchemas(): SubSchema[] {
        return this.graphQLSchemas.map(schema => new SubSchema(schema));
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