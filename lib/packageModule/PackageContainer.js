"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageContainer = void 0;
var SubSchema_1 = require("./SubSchema");
var PackageContainer = (function () {
    function PackageContainer() {
        this.packages = [];
        this.packagesInitialized = false;
        this.graphQLSchemas = [];
    }
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
    PackageContainer.getName = function () {
        return this._name;
    };
    PackageContainer._name = Symbol('packageContainer');
    return PackageContainer;
}());
exports.PackageContainer = PackageContainer;
