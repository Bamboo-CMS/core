import {PackageHandler} from "../../../packageModule/PackageHandler";
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

        const packageHandler = new PackageHandler();

        // Test if there is an empty result.
        expect(packageHandler.getMergedSchema() === null).toBeTruthy();

        // Register all resolvers.
        packageHandler.addResolver(firstResolverMock, Symbol());
        packageHandler.addResolver(secondResolverMock, Symbol());

        const resolverMap: any = packageHandler.getMergedSchema();

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