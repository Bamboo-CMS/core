import { IResolverContainer } from "./IResolverContainer";
import { IResolvers } from 'graphql-tools';
export declare class ResolverContainer implements IResolverContainer {
    private resolvers;
    getResolverMap(): IResolvers | null;
    register(resolverMap: IResolvers): void;
}
