import {Package} from "./Package";
import {IResolvers, mergeSchemas} from 'graphql-tools';
import {GraphQLSchema} from "graphql";
import { core } from "../Core";
import merge from "lodash.merge";
import { IExecutableSchemaDefinition, makeExecutableSchema } from '@graphql-tools/schema';
import PermissionInterface from '../authorizationModule/PermissionInterface';
import { RoleInterface } from '../authorizationModule/RoleInterface';

export const packageHandlerContainerName = Symbol('packageHandler');
export const packageHandlerContainerTags: string[] = ['packageHandler'];

type PermissionMap = { [k: string]: PermissionInterface };

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

    private _permissions: PermissionMap = {};

    private _roles: RoleInterface[] = [];

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

    addPermissions(permissions: PermissionInterface[]) {
        const pObject: PermissionMap = {};
        for (const p of permissions) {
            pObject[p.permission] = p;
        }

        this._permissions = {
            ...this._permissions,
            ...pObject
        };
    }

    addRole(role: RoleInterface) {
        this._roles.push(role);
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

    get permissions(): PermissionInterface[] {
        return Object.values(this._permissions);
    }

    getPermissionByName(permission: string): PermissionInterface | null {
        return this._permissions[permission] || null;
    }

    get roles(): RoleInterface[] {
        return this._roles;
    }
}