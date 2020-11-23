"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubSchema = void 0;
var SubSchema = (function () {
    function SubSchema(schema) {
        this._schema = schema;
    }
    Object.defineProperty(SubSchema.prototype, "schema", {
        get: function () {
            return this._schema;
        },
        set: function (value) {
            this._schema = value;
        },
        enumerable: false,
        configurable: true
    });
    return SubSchema;
}());
exports.SubSchema = SubSchema;
