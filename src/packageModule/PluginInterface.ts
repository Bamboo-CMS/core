import {IDirectiveResolvers, IResolvers} from '@graphql-tools/utils';
import {RoleInterface} from '../authorizationModule/RoleInterface';
import PermissionInterface from '../authorizationModule/PermissionInterface';
import {DocumentNode} from 'graphql';
import {ModelDefinition} from '../mongooseModule/ModelDefinition';

export interface PluginInterface {
  readonly resolvers: IResolvers[];

  readonly schemas: DocumentNode[];

  readonly roles: RoleInterface[];

  readonly permissions: PermissionInterface[];

  readonly modelDefinitions: ModelDefinition[];

  readonly directiveResolvers?: IDirectiveResolvers;

  /**
   * Function the core trigger if anything is registered.
   * Do your e.g. business logic here.
   */
  start(): void;
}
