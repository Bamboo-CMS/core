import { IResolvers } from 'graphql-tools';
import { RoleInterface } from '../authorizationModule/RoleInterface';
import PermissionInterface from '../authorizationModule/PermissionInterface';
import { DocumentNode } from 'graphql';

export interface PluginInterface {
  readonly resolvers: IResolvers[];

  readonly schemas: DocumentNode[];

  readonly roles: RoleInterface[];

  readonly permissions: PermissionInterface[];

  /**
   * Function the core trigger if anything is registered.
   * Do your e.g. business logic here.
   */
  start(): void;
}
