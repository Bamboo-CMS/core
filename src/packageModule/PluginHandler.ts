import {IResolvers, mergeSchemas} from 'graphql-tools';
import {GraphQLSchema} from "graphql";
import { core } from "../Core";
import merge from "lodash.merge";
import { IExecutableSchemaDefinition, makeExecutableSchema } from '@graphql-tools/schema';
import PermissionInterface from '../authorizationModule/PermissionInterface';
import { RoleInterface } from '../authorizationModule/RoleInterface';
import { PluginInterface } from './PluginInterface';

export const pluginHandlerContainerName = Symbol('pluginHandler');
export const pluginHandlerContainerTags: string[] = ['pluginHandler'];

type PermissionMap = { [k: string]: PermissionInterface };

export class PluginHandler {

    /**
     * The package tag is required to find all plugin entries.
     */
    private readonly defaultPluginContainerTag: string = 'plugin';

    /**
     * The resolver tag is required to find all resolver entries.
     */
    private readonly defaultResolverContainerTag: string = 'resolver';

    /**
     * The graphql tag is required to find all graphql schemas entries.
     */
    private readonly defaultGraphQLSchemaContainerTag: string = 'graphQLSchema';

    private _pluginsInitialized: boolean = false;

    private _permissions: PermissionMap = {};

    private _roles: RoleInterface[] = [];

    initializesPlugins(): void {
        if (this._pluginsInitialized) {
            return;
        }

        // Register each package.
        for (let bambooPlugin of this.plugins) {
            for (let schema of bambooPlugin.schemas) {
                this.addGraphQLSchemaDefinition(schema);
            }

            for (let resolver of bambooPlugin.resolvers) {
                this.addResolver(resolver);
            }

            this.addRoles(bambooPlugin.roles);

            this.addPermissions(bambooPlugin.permissions);
        }

        // Start each package.
        for (let bambooPlugin of this.plugins) {
            bambooPlugin.start();
        }

        this._pluginsInitialized = true;
    }

    registerPlugin(bambooPlugin: PluginInterface, name: Symbol, tags: string[] = []): void {
        core.container.register(bambooPlugin, name, [
            ...tags,
            this.defaultPluginContainerTag
        ]);
    }

    private addResolver(resolver: IResolvers): void {
        core.container.register(resolver, Symbol('resolver'), [this.defaultResolverContainerTag]);
    }

    private addGraphQLSchemaDefinition(graphQLSchemaDefinition: IExecutableSchemaDefinition): void {
        core.container.register(makeExecutableSchema(graphQLSchemaDefinition), Symbol('graphql-schema'), [this.defaultGraphQLSchemaContainerTag]);
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
        });
    }

    private addPermissions(permissions: PermissionInterface[]) {
        const pObject: PermissionMap = {};
        for (const p of permissions) {
            pObject[p.permission] = p;
        }

        this._permissions = {
            ...this._permissions,
            ...pObject
        };
    }

    private addRoles(roles: RoleInterface[]) {
        this._roles = [
          ...this.roles,
          ...roles
        ];
    }

    get graphQLSchemas(): GraphQLSchema[] {
        return core.container.getByTags([this.defaultGraphQLSchemaContainerTag]);
    }

    get resolvers(): IResolvers[] {
        return core.container.getByTags([this.defaultResolverContainerTag]);
    }

    get plugins(): PluginInterface[] {
        return core.container.getByTags([this.defaultPluginContainerTag]);
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