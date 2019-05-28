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
    var React = require("react");
    var CellMask_1 = require("./CellMask");
    function SelectionRangeMask(props) {
        return (React.createElement(CellMask_1.default, tslib_1.__assign({}, props, { className: "rdg-selected-range" })));
    }
    exports.default = SelectionRangeMask;
});
//# sourceMappingURL=SelectionRangeMask.js.map