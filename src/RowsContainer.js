(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function RowsContainer(_a) {
        var children = _a.children;
        return children;
    }
    exports.default = RowsContainer;
});
//# sourceMappingURL=RowsContainer.js.map