(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "./common/enums"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require("react");
    var enums_1 = require("./common/enums");
    function CellExpander(_a) {
        var expanded = _a.expanded, onCellExpand = _a.onCellExpand;
        function handleCellExpand(e) {
            e.stopPropagation();
            onCellExpand();
        }
        return (React.createElement("div", { className: "rdg-cell-expand" },
            React.createElement("span", { onClick: handleCellExpand }, expanded ? enums_1.CellExpand.DOWN_TRIANGLE : enums_1.CellExpand.RIGHT_TRIANGLE)));
    }
    exports.default = CellExpander;
});
//# sourceMappingURL=CellExpander.js.map