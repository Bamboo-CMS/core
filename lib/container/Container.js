"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
var ContainerItem_1 = require("./ContainerItem");
var Container = (function () {
    function Container() {
        this._containerItems = [];
    }
    Container.prototype.register = function (object, name, tags) {
        this._containerItems.push(new ContainerItem_1.ContainerItem(object, name, tags));
    };
    Container.prototype.get = function (name) {
        return this._containerItems.find(function (item) { return item.name === name; });
    };
    Container.prototype.getByTags = function (tags) {
        var items = this._containerItems.filter(function (item) { return item.tags.some(function (itemTag) { return tags.some(function (subTag) { return itemTag === subTag; }); }); });
        return items.map(function (item) { return item.object; });
    };
    Container.prototype.unregister = function (name) {
        var index = this._containerItems.findIndex(function (item) { return item.name === name; });
        if (index !== -1) {
            this._containerItems.splice(index, 1);
        }
    };
    return Container;
}());
exports.Container = Container;
