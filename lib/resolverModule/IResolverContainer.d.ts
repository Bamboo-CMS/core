import { IResolvers } from 'graphql-tools';
export interface IResolverContainer {
    getResolverMap(): IResolvers | null;
    register(resolver: IResolvers): void;
}
