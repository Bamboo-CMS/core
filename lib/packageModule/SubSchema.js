"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubSchema = void 0;
var SubSchema = (function () {
    function SubSchema(schema) {
        this.schema = schema;
    }
    SubSchema.prototype.getSchema = function () {
        return this.schema;
    };
    SubSchema.prototype.setSchema = function (schema) {
        this.schema = schema;
    };
    return SubSchema;
}());
exports.SubSchema = SubSchema;
