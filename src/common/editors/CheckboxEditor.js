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
    var React = require("react");
    function CheckboxEditor(_a) {
        var value = _a.value, rowIdx = _a.rowIdx, column = _a.column, dependentValues = _a.dependentValues;
        function handleChange(event) {
            if (column.onCellChange) {
                column.onCellChange(rowIdx, column.key, dependentValues, event);
            }
        }
        return (React.createElement("label", { className: "react-grid-checkbox-container checkbox-align" },
            React.createElement("input", { type: "checkbox", className: "react-grid-checkbox", onChange: handleChange, checked: value === true }),
            React.createElement("span", { className: "react-grid-checkbox-label" })));
    }
    exports.default = CheckboxEditor;
});
//# sourceMappingURL=CheckboxEditor.js.map