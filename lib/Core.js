"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.core = exports.Core = void 0;
var Container_1 = require("./container/Container");
var PackageHandler_1 = require("./packageModule/PackageHandler");
var Core = (function () {
    function Core(container) {
        this._booted = false;
        this._container = container;
        this.container.register(new PackageHandler_1.PackageHandler(), PackageHandler_1.packageHandlerContainerName, PackageHandler_1.packageHandlerContainerTags);
    }
    Core.prototype.boot = function () {
        var _a;
        if (this._booted) {
            return false;
        }
        (_a = this._container.get(PackageHandler_1.packageHandlerContainerName)) === null || _a === void 0 ? void 0 : _a.initializesPackages();
        this._booted = true;
        return this._booted;
    };
    Object.defineProperty(Core.prototype, "container", {
        get: function () {
            return this._container;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Core.prototype, "packageHandler", {
        get: function () {
            return this._container.get(PackageHandler_1.packageHandlerContainerName);
        },
        enumerable: false,
        configurable: true
    });
    return Core;
}());
exports.Core = Core;
exports.core = new Core(new Container_1.Container());
