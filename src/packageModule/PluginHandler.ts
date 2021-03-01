import {IDirectiveResolvers, IResolvers} from '@graphql-tools/utils';
import {mergeTypeDefs, mergeResolvers} from '@graphql-tools/merge';
import {DocumentNode, GraphQLSchema} from 'graphql';
import {core} from '../Core';
import {makeExecutableSchema} from '@graphql-tools/schema';
import PermissionInterface from '../authorizationModule/PermissionInterface';
import {RoleInterface} from '../authorizationModule/RoleInterface';
import {PluginInterface} from './PluginInterface';

export const pluginHandlerContainerName = 'pluginHandler';
export const pluginHandlerContainerTags: string[] = ['pluginHandler'];

type PermissionMap = {[k: string]: PermissionInterface};

export class PluginHandler {
  /**
   * The package tag is required to find all plugin entries.
   */
  private readonly defaultPluginContainerTag: string = 'plugin';

  /**
   * The resolver tag is required to find all resolver entries.
   */
  private readonly defaultResolverContainerTag: string = 'resolver';

  private _pluginsInitialized = false;

  private _permissions: PermissionMap = {};

  private _roles: RoleInterface[] = [];

  initializesPlugins(): void {
    if (this._pluginsInitialized) {
      return;
    }

    // Register each package.
    for (const bambooPlugin of this.plugins) {
      this.addRoles(bambooPlugin.roles);

      this.addPermissions(bambooPlugin.permissions);
    }

    // Start each package.
    for (const bambooPlugin of this.plugins) {
      bambooPlugin.start();
    }

    this._pluginsInitialized = true;
  }

  registerPlugin(bambooPlugin: PluginInterface, name: string, tags: string[] = []): void {
    core.container.register(bambooPlugin, name, [
      ...tags,
      this.defaultPluginContainerTag
    ]);
  }

  private getResolverMap(): IResolvers | undefined {
    if (this.resolvers.length <= 0) {
      return undefined;
    }

    return mergeResolvers(this.resolvers);
  }

  getMergedSchema(): GraphQLSchema {
    return makeExecutableSchema({
      typeDefs: mergeTypeDefs(this.graphQLSchemas),
      resolvers: this.getResolverMap(),
      directiveResolvers: this.graphQLDirectives
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
    this._roles = [...this.roles, ...roles];
  }

  get graphQLDirectives(): IDirectiveResolvers {
    let directiveResolvers: IDirectiveResolvers = {};

    for (const plugin of this.plugins) {
      if (plugin.directiveResolvers) {
        directiveResolvers = {
          ...directiveResolvers,
          ...plugin.directiveResolvers
        };
      }
    }

    return directiveResolvers;
  }

  get graphQLSchemas(): DocumentNode[] {
    let schemas: DocumentNode[] = [];

    for (const plugin of this.plugins) {
      schemas = [...schemas, ...plugin.schemas];
    }

    return schemas;
  }

  get resolvers(): IResolvers[] {
    let resolvers: IResolvers[] = [];

    for (const plugin of this.plugins) {
      resolvers = [...resolvers, ...plugin.resolvers];
    }

    return resolvers;
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
