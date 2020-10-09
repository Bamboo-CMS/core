import {ResolverContainer} from "../../../resolverModule/ResolverContainer";
import {IResolvers} from "graphql-tools";

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

        const resolverContainer = new ResolverContainer();

        // Test if there is an empty result.
        expect(resolverContainer.getResolverMap() === null).toBeTruthy();

        // Register all resolvers.
        resolverContainer.register(firstResolverMock);
        resolverContainer.register(secondResolverMock);

        const resolverMap: any = resolverContainer.getResolverMap();

        // Test if the two resolvers are merged.
        expect(typeof resolverMap).toBe('object');
        expect(resolverMap.Query).toBeDefined();
        expect(resolverMap.Query.firstQueryMock).toBeDefined();
        expect(resolverMap.Query.secondQueryMock).toBeDefined();
        expect(resolverMap.Mutation).toBeDefined();
        expect(resolverMap.Mutation.firstMutationMock).toBeDefined();
        expect(resolverMap.Mutation.secondMutationMock).toBeDefined();
    });
});