(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "classnames"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require("react");
    var classnames_1 = require("classnames");
    function ChildRowDeleteButton(_a) {
        var treeDepth = _a.treeDepth, cellHeight = _a.cellHeight, siblingIndex = _a.siblingIndex, numberSiblings = _a.numberSiblings, onDeleteSubRow = _a.onDeleteSubRow, isDeleteSubRowEnabled = _a.isDeleteSubRowEnabled, _b = _a.allowAddChildRow, allowAddChildRow = _b === void 0 ? true : _b;
        var lastSibling = siblingIndex === numberSiblings - 1;
        var className = classnames_1.default({ 'rdg-child-row-action-cross': allowAddChildRow === true || !lastSibling }, { 'rdg-child-row-action-cross-last': allowAddChildRow === false && (lastSibling || numberSiblings === 1) });
        var height = 12;
        var width = 12;
        var left = treeDepth * 15;
        var top = (cellHeight - 12) / 2;
        return (React.createElement("div", null,
            React.createElement("div", { className: className }),
            isDeleteSubRowEnabled && (React.createElement("div", { style: { left: left, top: top, width: width, height: height }, className: "rdg-child-row-btn", onClick: onDeleteSubRow },
                React.createElement("div", { className: "glyphicon glyphicon-remove-sign" })))));
    }
    exports.default = ChildRowDeleteButton;
});
//# sourceMappingURL=ChildRowDeleteButton.js.map