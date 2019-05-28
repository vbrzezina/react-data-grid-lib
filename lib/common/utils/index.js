(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "immutable"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var immutable_1 = require("immutable");
    function isColumnsImmutable(columns) {
        return immutable_1.default.List.isList(columns);
    }
    exports.isColumnsImmutable = isColumnsImmutable;
    function isEmptyArray(obj) {
        return Array.isArray(obj) && obj.length === 0;
    }
    exports.isEmptyArray = isEmptyArray;
    function isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
    exports.isFunction = isFunction;
    function isEmptyObject(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
    exports.isEmptyObject = isEmptyObject;
    function isImmutableCollection(objToVerify) {
        return immutable_1.default.Iterable.isIterable(objToVerify);
    }
    exports.isImmutableCollection = isImmutableCollection;
    function getMixedTypeValueRetriever(isImmutable) {
        return {
            getValue: isImmutable
                ? function (immutable, key) { return immutable.get(key); }
                : function (item, key) { return item[key]; }
        };
    }
    exports.getMixedTypeValueRetriever = getMixedTypeValueRetriever;
    exports.isImmutableMap = immutable_1.default.Map.isMap;
});
//# sourceMappingURL=index.js.map