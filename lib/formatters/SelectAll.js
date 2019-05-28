(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var react_1 = require("react");
    exports.SelectAll = react_1.forwardRef(function SelectAll(_a, ref) {
        var onChange = _a.onChange;
        return (react_1.default.createElement("label", { className: "react-grid-checkbox-container checkbox-align" },
            react_1.default.createElement("input", { type: "checkbox", className: "react-grid-checkbox", ref: ref, onChange: onChange }),
            react_1.default.createElement("span", { className: "react-grid-checkbox-label" })));
    });
});
//# sourceMappingURL=SelectAll.js.map