import {ResolverContainerInterface} from "./ResolverContainerInterface";
import {IResolvers} from 'graphql-tools';
import merge from 'lodash.merge';

export class ResolverContainer implements ResolverContainerInterface {

    private static readonly _name: Symbol = Symbol('resolverContainer');
    private resolvers: IResolvers[] = [];

    getResolverMap(): IResolvers | null {
        if (this.resolvers.length <= 0) {
            return null;
        }

        // Merge the resolvers.
        const mergedResolvers = {};

        this.resolvers.forEach(resolver => merge(mergedResolvers, resolver));

        return mergedResolvers;
    }

    register(resolverMap: IResolvers): void {
        this.resolvers.push(resolverMap);
    }

    static getName(): Symbol {
        return this._name;
    }
}