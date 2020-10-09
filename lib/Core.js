"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.core = void 0;
var Container_1 = require("./container/Container");
var ResolverContainer_1 = require("./resolverModule/ResolverContainer");
var PackageContainer_1 = require("./packageModule/PackageContainer");
var Core = (function () {
    function Core(container) {
        this._booted = false;
        this._container = container;
        this.container.register(new ResolverContainer_1.ResolverContainer(), ResolverContainer_1.ResolverContainer.getName(), ['container']);
        this.container.register(new PackageContainer_1.PackageContainer(), PackageContainer_1.PackageContainer.getName(), ['container']);
    }
    Core.prototype.boot = function () {
        if (this._booted) {
            return;
        }
        this._booted = true;
        this._container.get(ResolverContainer_1.ResolverContainer.getName()).initializesPackages();
    };
    Object.defineProperty(Core.prototype, "container", {
        get: function () {
            return this._container;
        },
        enumerable: false,
        configurable: true
    });
    return Core;
}());
var _core = new Core(new Container_1.Container());
exports.core = _core;
