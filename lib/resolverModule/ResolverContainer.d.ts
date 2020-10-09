import { ResolverContainerInterface } from "./ResolverContainerInterface";
import { IResolvers } from 'graphql-tools';
export declare class ResolverContainer implements ResolverContainerInterface {
    private static readonly _name;
    private resolvers;
    getResolverMap(): IResolvers | null;
    register(resolverMap: IResolvers): void;
    static getName(): Symbol;
}
