import { PluginInterface } from './PluginInterface';
import { IResolvers } from 'graphql-tools';
import { RoleInterface } from '../authorizationModule/RoleInterface';
import PermissionInterface from '../authorizationModule/PermissionInterface';
import { IExecutableSchemaDefinition } from '@graphql-tools/schema';

export abstract class BasePlugin implements PluginInterface {
  abstract readonly resolvers: IResolvers[];
  abstract readonly schemas: IExecutableSchemaDefinition[];

  get roles(): RoleInterface[] {
    return [];
  }

  get permissions(): PermissionInterface[] {
    return [];
  }

  start(): void {
  }
}