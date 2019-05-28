(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "react-is"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require("react");
    var react_is_1 = require("react-is");
    function ToolbarContainer(_a) {
        var toolbar = _a.toolbar, columns = _a.columns, rowsCount = _a.rowsCount, onToggleFilter = _a.onToggleFilter;
        if (!toolbar) {
            return null;
        }
        var toolBarProps = { columns: columns, onToggleFilter: onToggleFilter, rowsCount: rowsCount };
        if (react_is_1.isElement(toolbar)) {
            return React.cloneElement(toolbar, toolBarProps);
        }
        if (react_is_1.isValidElementType(toolbar)) {
            return React.createElement(toolbar, toolBarProps);
        }
        return null;
    }
    exports.default = ToolbarContainer;
});
//# sourceMappingURL=ToolbarContainer.js.map