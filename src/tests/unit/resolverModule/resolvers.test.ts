import gql from 'graphql-tag';
import {IResolvers} from '@graphql-tools/utils';
import {BasePlugin} from '../../../packageModule/BasePlugin';
import {core} from '../../../Core';

describe('Resolver tests', () => {
  it('should register an observer', async () => {
    const firstResolverMock: IResolvers = {
      Query: {
        firstQueryMock(): string {
          return 'first';
        }
      },
      Mutation: {
        firstMutationMock(): string {
          return 'first';
        }
      }
    };

    const secondResolverMock: IResolvers = {
      Query: {
        secondQueryMock(): string {
          return 'second';
        }
      },
      Mutation: {
        secondMutationMock(): string {
          return 'second';
        }
      }
    };

    const pluginHandler = core.pluginHandler;

    // Test if there is an empty result.
    expect(pluginHandler.getMergedSchema().getQueryType() === undefined).toBeTruthy();

    const testPluginInstance = new (class extends BasePlugin {
      readonly resolvers = [firstResolverMock, secondResolverMock];
      readonly schemas = [
        gql`
          type Query {
            firstQueryMock: String
            secondQueryMock: String
          }
          type Mutation {
            firstMutationMock: String
            secondMutationMock: String
          }
        `
      ];
    })();

    pluginHandler.registerPlugin(testPluginInstance, 'testPlugin');
    pluginHandler.initializesPlugins();

    const resolverMap = pluginHandler.getMergedSchema();

    // Test if the two resolvers are merged.
    expect(typeof resolverMap).toBe('object');
    //TODO:: Tests.. just do it!
  });
});
