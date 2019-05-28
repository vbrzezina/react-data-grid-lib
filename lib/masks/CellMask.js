(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "react", "classnames"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var react_1 = require("react");
    var classnames_1 = require("classnames");
    var CellMask = react_1.forwardRef(function CellMask(_a, ref) {
        var width = _a.width, height = _a.height, top = _a.top, left = _a.left, zIndex = _a.zIndex, className = _a.className, props = tslib_1.__rest(_a, ["width", "height", "top", "left", "zIndex", "className"]);
        return (react_1.default.createElement("div", tslib_1.__assign({ className: classnames_1.default('rdg-cell-mask', className), style: {
                height: height,
                width: width,
                zIndex: zIndex,
                transform: "translate(" + left + "px, " + top + "px)"
            }, "data-test": "cell-mask", ref: ref }, props)));
    });
    exports.default = CellMask;
});
//# sourceMappingURL=CellMask.js.map