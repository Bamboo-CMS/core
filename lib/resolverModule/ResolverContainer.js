"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolverContainer = void 0;
var lodash_merge_1 = __importDefault(require("lodash.merge"));
var ResolverContainer = (function () {
    function ResolverContainer() {
        this.resolvers = [];
    }
    ResolverContainer.prototype.getResolverMap = function () {
        if (this.resolvers.length <= 0) {
            return null;
        }
        var mergedResolvers = {};
        this.resolvers.forEach(function (resolver) { return lodash_merge_1.default(mergedResolvers, resolver); });
        return mergedResolvers;
    };
    ResolverContainer.prototype.register = function (resolverMap) {
        this.resolvers.push(resolverMap);
    };
    return ResolverContainer;
}());
exports.ResolverContainer = ResolverContainer;
