"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseEntityContainer = void 0;
var MongooseEntityContainer = (function () {
    function MongooseEntityContainer() {
        this.entities = [];
    }
    MongooseEntityContainer.prototype.getEntityMap = function () {
        return this.entities;
    };
    MongooseEntityContainer.prototype.register = function (entity) {
        this.entities.push(entity);
    };
    return MongooseEntityContainer;
}());
exports.MongooseEntityContainer = MongooseEntityContainer;
