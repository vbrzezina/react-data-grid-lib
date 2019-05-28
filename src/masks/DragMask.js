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
    function DragMask(_a) {
        var draggedPosition = _a.draggedPosition, getSelectedDimensions = _a.getSelectedDimensions;
        var overRowIdx = draggedPosition.overRowIdx, idx = draggedPosition.idx, rowIdx = draggedPosition.rowIdx;
        if (rowIdx === overRowIdx)
            return null;
        var isDraggedOverDown = rowIdx < overRowIdx;
        var startRowIdx = isDraggedOverDown ? rowIdx + 1 : overRowIdx;
        var endRowIdx = isDraggedOverDown ? overRowIdx : rowIdx - 1;
        var className = isDraggedOverDown ? 'react-grid-cell-dragged-over-down' : 'react-grid-cell-dragged-over-up';
        var dimensions = getSelectedDimensions({ idx: idx, rowIdx: startRowIdx });
        for (var currentRowIdx = startRowIdx + 1; currentRowIdx <= endRowIdx; currentRowIdx++) {
            var height = getSelectedDimensions({ idx: idx, rowIdx: currentRowIdx }).height;
            dimensions.height += height;
        }
        return (React.createElement(CellMask_1.default, tslib_1.__assign({}, dimensions, { className: className })));
    }
    exports.default = DragMask;
});
//# sourceMappingURL=DragMask.js.map