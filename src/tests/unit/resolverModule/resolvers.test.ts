import { PluginHandler } from '../../../packageModule/PluginHandler';
import { IResolvers } from 'graphql-tools';

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

    const packageHandler = new PluginHandler();

    // Test if there is an empty result.
    expect(packageHandler.getMergedSchema() === null).toBeTruthy();

    // Register all resolvers.
    packageHandler.addResolver(firstResolverMock, Symbol());
    packageHandler.addResolver(secondResolverMock, Symbol());

    const resolverMap = packageHandler.getMergedSchema();

    // Test if the two resolvers are merged.
    expect(typeof resolverMap).toBe('object');
    //TODO:: Tests.. just do it!
  });
});
