import { IResolvers } from 'graphql-tools';
import { RoleInterface } from '../authorizationModule/RoleInterface';
import PermissionInterface from '../authorizationModule/PermissionInterface';
import { IExecutableSchemaDefinition } from '@graphql-tools/schema';

export interface PluginInterface {
  readonly resolvers: IResolvers[];

  readonly schemas: IExecutableSchemaDefinition[];

  readonly roles: RoleInterface[];

  readonly permissions: PermissionInterface[];

  /**
   * Function the core trigger if anything is registered.
   * Do your e.g. business logic here.
   */
  start(): void;
}