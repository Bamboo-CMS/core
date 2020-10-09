"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageHandler = exports.packageHandlerContainerTags = exports.packageHandlerContainerName = void 0;
var SubSchema_1 = require("./SubSchema");
var Core_1 = require("../Core");
var lodash_merge_1 = __importDefault(require("lodash.merge"));
exports.packageHandlerContainerName = Symbol('packageHandler');
exports.packageHandlerContainerTags = ['packageHandler'];
var PackageHandler = (function () {
    function PackageHandler() {
        this.defaultPackageContainerTag = 'package';
        this.defaultResolverContainerTag = 'resolver';
        this.defaultGraphQLSchemaContainerTag = 'graphQLSchema';
        this._packagesInitialized = false;
    }
    PackageHandler.prototype.initializesPackages = function () {
        if (this._packagesInitialized) {
            return;
        }
        for (var _i = 0, _a = this.packages; _i < _a.length; _i++) {
            var bambooPackage = _a[_i];
            bambooPackage.register();
        }
        for (var _b = 0, _c = this.packages; _b < _c.length; _b++) {
            var bambooPackage = _c[_b];
            bambooPackage.start();
        }
        this._packagesInitialized = true;
    };
    PackageHandler.prototype.registerPackage = function (bambooPackage, name, tags) {
        if (tags === void 0) { tags = []; }
        Core_1.core.container.register(bambooPackage, name, __spreadArrays(tags, [this.defaultPackageContainerTag]));
    };
    PackageHandler.prototype.addResolver = function (resolver, name, tags) {
        if (tags === void 0) { tags = []; }
        Core_1.core.container.register(resolver, name, __spreadArrays(tags, [this.defaultResolverContainerTag]));
    };
    PackageHandler.prototype.addGraphQLSchema = function (graphQLSchema, name, tags) {
        if (tags === void 0) { tags = []; }
        Core_1.core.container.register(graphQLSchema, name, __spreadArrays(tags, [this.defaultGraphQLSchemaContainerTag]));
    };
    PackageHandler.prototype.getResolverMap = function () {
        if (this.resolvers.length <= 0) {
            return null;
        }
        var mergedResolvers = {};
        this.resolvers.forEach(function (resolver) { return lodash_merge_1.default(mergedResolvers, resolver); });
        return mergedResolvers;
    };
    PackageHandler.prototype.getSubSchemas = function () {
        return this.graphQLSchemas.map(function (schema) { return new SubSchema_1.SubSchema(schema); });
    };
    Object.defineProperty(PackageHandler.prototype, "graphQLSchemas", {
        get: function () {
            return Core_1.core.container.getByTags([this.defaultGraphQLSchemaContainerTag]);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PackageHandler.prototype, "resolvers", {
        get: function () {
            return Core_1.core.container.getByTags([this.defaultResolverContainerTag]);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PackageHandler.prototype, "packages", {
        get: function () {
            return Core_1.core.container.getByTags([this.defaultPackageContainerTag]);
        },
        enumerable: false,
        configurable: true
    });
    return PackageHandler;
}());
exports.PackageHandler = PackageHandler;
