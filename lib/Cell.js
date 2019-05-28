import * as tslib_1 from "tslib";
import * as React from 'react';
import classNames from 'classnames';
import { isElement, isValidElementType } from 'react-is';
import { SimpleCellFormatter } from './formatters';
import CellAction from './CellAction';
import CellExpand from './CellExpander';
import ChildRowDeleteButton from './ChildRowDeleteButton';
import { isFrozen } from './ColumnUtils';
var getSubRowOptions = function (_a) {
    var rowIdx = _a.rowIdx, idx = _a.idx, rowData = _a.rowData, expandArgs = _a.expandableOptions;
    return ({ rowIdx: rowIdx, idx: idx, rowData: rowData, expandArgs: expandArgs });
};
var Cell = /** @class */ (function (_super) {
    tslib_1.__extends(Cell, _super);
    function Cell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cell = React.createRef();
        _this.handleCellClick = function () {
            var _a = _this.props, idx = _a.idx, rowIdx = _a.rowIdx, cellMetaData = _a.cellMetaData;
            cellMetaData.onCellClick({ idx: idx, rowIdx: rowIdx });
        };
        _this.handleCellMouseDown = function () {
            var _a = _this.props, idx = _a.idx, rowIdx = _a.rowIdx, cellMetaData = _a.cellMetaData;
            if (cellMetaData.onCellMouseDown) {
                cellMetaData.onCellMouseDown({ idx: idx, rowIdx: rowIdx });
            }
        };
        _this.handleCellMouseEnter = function () {
            var _a = _this.props, idx = _a.idx, rowIdx = _a.rowIdx, cellMetaData = _a.cellMetaData;
            if (cellMetaData.onCellMouseEnter) {
                cellMetaData.onCellMouseEnter({ idx: idx, rowIdx: rowIdx });
            }
        };
        _this.handleCellContextMenu = function () {
            var _a = _this.props, idx = _a.idx, rowIdx = _a.rowIdx, cellMetaData = _a.cellMetaData;
            cellMetaData.onCellContextMenu({ idx: idx, rowIdx: rowIdx });
        };
        _this.handleCellDoubleClick = function (e) {
            e.stopPropagation();
            var _a = _this.props, idx = _a.idx, rowIdx = _a.rowIdx, cellMetaData = _a.cellMetaData;
            cellMetaData.onCellDoubleClick({ idx: idx, rowIdx: rowIdx });
        };
        _this.handleCellExpand = function () {
            var onCellExpand = _this.props.cellMetaData.onCellExpand;
            if (onCellExpand) {
                onCellExpand(getSubRowOptions(_this.props));
            }
        };
        _this.handleDeleteSubRow = function () {
            var meta = _this.props.cellMetaData;
            if (meta.onDeleteSubRow) {
                meta.onDeleteSubRow(getSubRowOptions(_this.props));
            }
        };
        _this.handleDragOver = function (e) {
            e.preventDefault();
        };
        return _this;
    }
    Cell.prototype.componentDidMount = function () {
        this.checkScroll();
    };
    Cell.prototype.componentDidUpdate = function (prevProps) {
        if (isFrozen(prevProps.column) && !isFrozen(this.props.column)) {
            this.removeScroll();
        }
    };
    Cell.prototype.getStyle = function () {
        return {
            width: this.props.column.width,
            height: this.props.height,
            left: this.props.column.left
        };
    };
    Cell.prototype.getRowData = function () {
        var rowData = this.props.rowData;
        return typeof rowData.toJSON === 'function' ? rowData.toJSON() : rowData;
    };
    Cell.prototype.getFormatterDependencies = function () {
        // convention based method to get corresponding Id or Name of any Name or Id property
        var getRowMetaData = this.props.column.getRowMetaData;
        if (getRowMetaData) {
            if (process.env.NODE_ENV === 'development') {
                console.warn('getRowMetaData for formatters is deprecated and will be removed in a future version of ReactDataGrid. Instead access row prop of formatter');
            }
            return getRowMetaData(this.getRowData(), this.props.column);
        }
    };
    Cell.prototype.getCellClass = function () {
        var _a = this.props, idx = _a.idx, column = _a.column, lastFrozenColumnIndex = _a.lastFrozenColumnIndex, isRowSelected = _a.isRowSelected, tooltip = _a.tooltip, expandableOptions = _a.expandableOptions;
        return classNames(column.cellClass, 'react-grid-Cell', this.props.className, {
            'react-grid-Cell--frozen': isFrozen(column),
            'rdg-last--frozen': lastFrozenColumnIndex === idx,
            'row-selected': isRowSelected,
            'has-tooltip': !!tooltip,
            'rdg-child-cell': expandableOptions && expandableOptions.subRowDetails && expandableOptions.treeDepth > 0
        });
    };
    Cell.prototype.checkScroll = function () {
        var _a = this.props, scrollLeft = _a.scrollLeft, column = _a.column;
        var node = this.cell.current;
        if (isFrozen(column) && node && node.style.transform != null) {
            this.setScrollLeft(scrollLeft);
        }
    };
    Cell.prototype.setScrollLeft = function (scrollLeft) {
        var node = this.cell.current;
        if (node) {
            node.style.transform = "translateX(" + scrollLeft + "px)";
        }
    };
    Cell.prototype.removeScroll = function () {
        var node = this.cell.current;
        if (node) {
            node.style.transform = null;
        }
    };
    Cell.prototype.getEvents = function () {
        var _a = this.props, column = _a.column, cellMetaData = _a.cellMetaData, idx = _a.idx, rowIdx = _a.rowIdx, rowData = _a.rowData;
        var columnEvents = column.events;
        var allEvents = {
            onClick: this.handleCellClick,
            onMouseDown: this.handleCellMouseDown,
            onMouseEnter: this.handleCellMouseEnter,
            onDoubleClick: this.handleCellDoubleClick,
            onContextMenu: this.handleCellContextMenu,
            onDragOver: this.handleDragOver
        };
        if (!columnEvents) {
            return allEvents;
        }
        var _loop_1 = function (event_1) {
            var columnEventHandler = columnEvents[event_1];
            if (columnEventHandler) {
                var eventInfo_1 = {
                    idx: idx,
                    rowIdx: rowIdx,
                    column: column,
                    rowId: rowData[cellMetaData.rowKey]
                };
                if (allEvents.hasOwnProperty(event_1)) {
                    var existingEvent_1 = allEvents[event_1];
                    allEvents[event_1] = function (e) {
                        existingEvent_1(e);
                        columnEventHandler(e, eventInfo_1);
                    };
                }
                else {
                    allEvents[event_1] = function (e) {
                        columnEventHandler(e, eventInfo_1);
                    };
                }
            }
        };
        for (var event_1 in columnEvents) {
            _loop_1(event_1);
        }
        return allEvents;
    };
    Cell.prototype.getCellActions = function () {
        var _a = this.props, cellMetaData = _a.cellMetaData, column = _a.column, rowData = _a.rowData;
        if (cellMetaData.getCellActions) {
            var cellActionButtons = cellMetaData.getCellActions(column, rowData);
            if (cellActionButtons && cellActionButtons.length > 0) {
                return cellActionButtons.map(function (action, index) {
                    return React.createElement(CellAction, tslib_1.__assign({ key: index, isFirst: index === 0 }, action));
                });
            }
        }
        return null;
    };
    Cell.prototype.renderCellContent = function () {
        var cellContent;
        var _a = this.props, value = _a.value, column = _a.column, height = _a.height, tooltip = _a.tooltip, isScrolling = _a.isScrolling, expandableOptions = _a.expandableOptions, cellMetaData = _a.cellMetaData, rowIdx = _a.rowIdx;
        var Formatter = column.formatter;
        var cellProps = {
            rowIdx: rowIdx,
            value: value,
            isScrolling: isScrolling,
            column: column,
            row: this.getRowData(),
            dependentValues: this.getFormatterDependencies()
        };
        if (isElement(Formatter)) {
            cellContent = React.cloneElement(Formatter, cellProps);
        }
        else if (isValidElementType(Formatter)) {
            cellContent = React.createElement(Formatter, tslib_1.__assign({}, cellProps));
        }
        else {
            cellContent = React.createElement(SimpleCellFormatter, { value: value });
        }
        var isExpandCell = expandableOptions ? expandableOptions.field === column.key : false;
        var treeDepth = expandableOptions ? expandableOptions.treeDepth : 0;
        var marginLeft = expandableOptions && isExpandCell ? expandableOptions.treeDepth * 30 : 0;
        var isDeleteSubRowEnabled = !!cellMetaData.onDeleteSubRow;
        var cellDeleter = expandableOptions && treeDepth > 0 && isExpandCell && (React.createElement(ChildRowDeleteButton, { treeDepth: treeDepth, cellHeight: height, siblingIndex: expandableOptions.subRowDetails.siblingIndex, numberSiblings: expandableOptions.subRowDetails.numberSiblings, onDeleteSubRow: this.handleDeleteSubRow, isDeleteSubRowEnabled: isDeleteSubRowEnabled }));
        var cellTooltip = tooltip && React.createElement("span", { className: "cell-tooltip-text" }, tooltip);
        var classes = classNames('react-grid-Cell__value', { 'cell-tooltip': !!tooltip });
        return (React.createElement("div", { className: classes },
            cellDeleter,
            React.createElement("div", { className: "react-grid-Cell__container", style: { marginLeft: marginLeft } },
                React.createElement("span", null, cellContent),
                this.props.cellControls),
            cellTooltip));
    };
    Cell.prototype.render = function () {
        var _a = this.props, column = _a.column, children = _a.children, expandableOptions = _a.expandableOptions;
        if (column.hidden) {
            return null;
        }
        var style = this.getStyle();
        var className = this.getCellClass();
        var cellActionButtons = this.getCellActions();
        var cellContent = children || this.renderCellContent();
        var events = this.getEvents();
        var cellExpander = expandableOptions && expandableOptions.canExpand && (React.createElement(CellExpand, { expanded: expandableOptions.expanded, onCellExpand: this.handleCellExpand }));
        return (React.createElement("div", tslib_1.__assign({ ref: this.cell, className: className, style: style }, events),
            cellActionButtons,
            cellExpander,
            cellContent));
    };
    Cell.defaultProps = {
        value: ''
    };
    return Cell;
}(React.PureComponent));
export default Cell;
//# sourceMappingURL=Cell.js.map