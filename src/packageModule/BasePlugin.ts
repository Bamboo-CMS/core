import { PluginInterface } from './PluginInterface';
import { IResolvers } from '@graphql-tools/utils';
import { RoleInterface } from '../authorizationModule/RoleInterface';
import PermissionInterface from '../authorizationModule/PermissionInterface';
import { DocumentNode } from 'graphql';
import {ModelDefinition} from "../mongooseModule/ModelDefinition";

export abstract class BasePlugin implements PluginInterface {
  abstract readonly resolvers: IResolvers[];
  abstract readonly schemas: DocumentNode[];

  get roles(): RoleInterface[] {
    return [];
  }

  get permissions(): PermissionInterface[] {
    return [];
  }

  get modelDefinitions(): ModelDefinition[] {
    return [];
  }

  start(): void {}
}
