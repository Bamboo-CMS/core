"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
var ContainerItem_1 = require("./ContainerItem");
var Container = (function () {
    function Container() {
        this._containerItems = [];
    }
    Container.prototype.register = function (object, name, tags) {
        if (tags === void 0) { tags = []; }
        this._containerItems.push(new ContainerItem_1.ContainerItem(object, name, tags));
    };
    Container.prototype.get = function (name) {
        return this._containerItems.find(function (item) { return item.name === name; });
    };
    Container.prototype.getByTag = function (tag) {
        var items = this._containerItems.filter(function (item) { return item.tags.some(function (itemTag) { return itemTag === tag; }); });
        return items.map(function (item) { return item.object; });
    };
    return Container;
}());
exports.Container = Container;
