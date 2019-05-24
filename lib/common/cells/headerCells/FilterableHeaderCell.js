import * as tslib_1 from "tslib";
import React, { useState } from 'react';
export default function FilterableHeaderCell(_a) {
    var column = _a.column, onChange = _a.onChange;
    var _b = tslib_1.__read(useState(), 2), filterTerm = _b[0], setFilterTerm = _b[1];
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
        return React.createElement("div", null);
    }
    return (React.createElement("div", { className: "form-group" },
        React.createElement("input", { key: "header-filter-" + column.key, className: "form-control input-sm", placeholder: "Search", value: filterTerm, onChange: handleChange })));
}
//# sourceMappingURL=FilterableHeaderCell.js.map