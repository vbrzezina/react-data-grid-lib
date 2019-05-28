(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "react", "./CellMask"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var react_1 = require("react");
    var CellMask_1 = require("./CellMask");
    var SelectionMask = react_1.forwardRef(function SelectionMask(props, ref) {
        return (react_1.default.createElement(CellMask_1.default, tslib_1.__assign({}, props, { className: "rdg-selected", ref: ref, tabIndex: 0 })));
    });
    exports.default = SelectionMask;
});
//# sourceMappingURL=SelectionMask.js.map