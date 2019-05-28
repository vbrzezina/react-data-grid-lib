(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var react_1 = require("react");
    function FilterableHeaderCell(_a) {
        var column = _a.column, onChange = _a.onChange;
        var _b = tslib_1.__read(react_1.useState(), 2), filterTerm = _b[0], setFilterTerm = _b[1];
        function handleChange(event) {
            var value = event.target.value;
            var filterTerm = value === '' ? [] : [{
                    type: 0,
                    value: value
                }];
            setFilterTerm(filterTerm);
            if (onChange) {
                onChange({
                    filterTerm: filterTerm, column: column, filterValues: filterValues, rawValue: value
                });
            }
        }
        function filterValues(row, columnFilter, columnKey) {
            if (!columnFilter.filterTerm.length)
                return true;
            // implement default filter logic
            var value = row[columnKey];
            var regex = new RegExp(columnFilter.filterTerm[0].value, 'gi');
            return !!(value.match(regex));
        }
        if (column.filterable === false) {
            return react_1.default.createElement("div", null);
        }
        return (react_1.default.createElement("div", { className: "form-group" },
            react_1.default.createElement("input", { key: "header-filter-" + column.key, className: "form-control input-sm", placeholder: "Search", value: filterTerm, onChange: handleChange })));
    }
    exports.default = FilterableHeaderCell;
});
//# sourceMappingURL=FilterableHeaderCell.js.map