import {IPackageContainer} from "./IPackageContainer";
import {IPackage} from "./IPackage";
import {ResolverContainer} from "../resolverModule/ResolverContainer";
import {IResolvers} from 'graphql-tools';
import {ResolverContainerInterface} from "../resolverModule/ResolverContainerInterface";
import {GraphQLSchema} from "graphql";
import {SubSchema} from "./SubSchema";

export class PackageContainer implements IPackageContainer {
    private static readonly _name: Symbol = Symbol('packageContainer');
    private packages: IPackage[] = [];
    private packagesInitialized: boolean = false;
    private graphQLSchemas:  GraphQLSchema[] = [];

    initializesPackages(): void {
        if (this.packagesInitialized) {
            return;
        }

        for (let bambooPackage of this.packages) {
            bambooPackage.start(this);
        }

        this.packagesInitialized = true;
    }

    registerPackage(bambooPackage: IPackage): void {
        this.packages.push(bambooPackage);
    }

    removePackage(bambooPackage: IPackage): void {
        // TODO:: Implement me
    }

    registerResolver(resolver: IResolvers): void {
        this.resolverContainer.register(resolver);
    }

    getResolverMap(): IResolvers|undefined {
        return this.resolverContainer.getResolverMap() || undefined;
    }

    getGraphQLSchemas(): GraphQLSchema[] {
        return this.graphQLSchemas;
    }

    getSubSchemas(): SubSchema[] {
        return this.graphQLSchemas.map(schema => new SubSchema(schema));
    }

    addGraphQLSchema(graphQLSchema: GraphQLSchema): void {
        this.graphQLSchemas.push(graphQLSchema);
    }

    static getName(): Symbol {
        return this._name;
    }
}