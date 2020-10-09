"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerItem = void 0;
var ContainerItem = (function () {
    function ContainerItem(object, name, tags) {
        this._object = object;
        this._name = name;
        this._tags = tags;
    }
    Object.defineProperty(ContainerItem.prototype, "object", {
        get: function () {
            return this._object;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContainerItem.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContainerItem.prototype, "tags", {
        get: function () {
            return this._tags;
        },
        enumerable: false,
        configurable: true
    });
    return ContainerItem;
}());
exports.ContainerItem = ContainerItem;
