import {IResolvers} from 'graphql-tools';

export interface ResolverContainerInterface {
    getResolverMap(): IResolvers|null;
    register(resolver: IResolvers): void;
}