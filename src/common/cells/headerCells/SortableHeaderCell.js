(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "react-is", "../../enums"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a;
    var React = require("react");
    var react_is_1 = require("react-is");
    var enums_1 = require("../../enums");
    var SORT_TEXT = (_a = {},
        _a[enums_1.DEFINE_SORT.ASC] = '\u25B2',
        _a[enums_1.DEFINE_SORT.DESC] = '\u25BC',
        _a[enums_1.DEFINE_SORT.NONE] = '',
        _a);
    function SortableHeaderCell(props) {
        var column = props.column, rowType = props.rowType, onSort = props.onSort, sortDirection = props.sortDirection, sortDescendingFirst = props.sortDescendingFirst;
        function onClick() {
            var direction;
            switch (sortDirection) {
                case enums_1.DEFINE_SORT.ASC:
                    direction = sortDescendingFirst ? enums_1.DEFINE_SORT.NONE : enums_1.DEFINE_SORT.DESC;
                    break;
                case enums_1.DEFINE_SORT.DESC:
                    direction = sortDescendingFirst ? enums_1.DEFINE_SORT.ASC : enums_1.DEFINE_SORT.NONE;
                    break;
                default:
                    direction = sortDescendingFirst ? enums_1.DEFINE_SORT.DESC : enums_1.DEFINE_SORT.ASC;
                    break;
            }
            onSort(column.key, direction);
        }
        var headerRenderer = column.headerRenderer;
        var content = !headerRenderer
            ? column.name
            : react_is_1.isElement(headerRenderer)
                ? React.cloneElement(headerRenderer, { column: column })
                : React.createElement(headerRenderer, { column: column, rowType: rowType });
        return (React.createElement("div", { className: "rdg-sortable-header-cell", onClick: onClick },
            React.createElement("span", { className: "pull-right" }, SORT_TEXT[sortDirection]),
            content));
    }
    exports.default = SortableHeaderCell;
});
//# sourceMappingURL=SortableHeaderCell.js.map