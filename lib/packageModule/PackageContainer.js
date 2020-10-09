"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageContainer = void 0;
var ResolverContainer_1 = require("../resolverModule/ResolverContainer");
var SubSchema_1 = require("./SubSchema");
var PackageContainer = (function () {
    function PackageContainer(resolverContainer) {
        this.packages = [];
        this.packagesInitialized = false;
        this.graphQLSchemas = [];
        this.resolverContainer = resolverContainer;
    }
    PackageContainer.getInstance = function (resolverContainer) {
        if (resolverContainer === void 0) { resolverContainer = null; }
        if (this.instance == null) {
            if (resolverContainer === null) {
                resolverContainer = new ResolverContainer_1.ResolverContainer();
            }
            this.instance = new PackageContainer(resolverContainer);
        }
        return this.instance;
    };
    PackageContainer.prototype.initializesPackages = function () {
        if (this.packagesInitialized) {
            return;
        }
        for (var _i = 0, _a = this.packages; _i < _a.length; _i++) {
            var bambooPackage = _a[_i];
            bambooPackage.start(this);
        }
        this.packagesInitialized = true;
    };
    PackageContainer.prototype.registerPackage = function (bambooPackage) {
        this.packages.push(bambooPackage);
    };
    PackageContainer.prototype.removePackage = function (bambooPackage) {
    };
    PackageContainer.prototype.registerResolver = function (resolver) {
        this.resolverContainer.register(resolver);
    };
    PackageContainer.prototype.getResolverMap = function () {
        return this.resolverContainer.getResolverMap() || undefined;
    };
    PackageContainer.prototype.getGraphQLSchemas = function () {
        return this.graphQLSchemas;
    };
    PackageContainer.prototype.getSubSchemas = function () {
        return this.graphQLSchemas.map(function (schema) { return new SubSchema_1.SubSchema(schema); });
    };
    PackageContainer.prototype.addGraphQLSchema = function (graphQLSchema) {
        this.graphQLSchemas.push(graphQLSchema);
    };
    PackageContainer.instance = null;
    return PackageContainer;
}());
exports.PackageContainer = PackageContainer;
