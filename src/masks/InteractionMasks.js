(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "react", "react-is", "./SelectionMask", "./SelectionRangeMask", "./CopyMask", "./DragMask", "./DragHandle", "../common/editors/EditorContainer", "../common/editors/EditorPortal", "../common/utils/keyboardUtils", "../utils/SelectedCellUtils", "../ColumnUtils", "../KeyCodes", "../common/enums"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var react_1 = require("react");
    var react_is_1 = require("react-is");
    // Components
    var SelectionMask_1 = require("./SelectionMask");
    var SelectionRangeMask_1 = require("./SelectionRangeMask");
    var CopyMask_1 = require("./CopyMask");
    var DragMask_1 = require("./DragMask");
    var DragHandle_1 = require("./DragHandle");
    var EditorContainer_1 = require("../common/editors/EditorContainer");
    var EditorPortal_1 = require("../common/editors/EditorPortal");
    // Utils
    var keyboardUtils_1 = require("../common/utils/keyboardUtils");
    var SelectedCellUtils_1 = require("../utils/SelectedCellUtils");
    var ColumnUtils_1 = require("../ColumnUtils");
    var KeyCodes_1 = require("../KeyCodes");
    // Types
    var enums_1 = require("../common/enums");
    var SCROLL_CELL_BUFFER = 2;
    var InteractionMasks = /** @class */ (function (_super) {
        tslib_1.__extends(InteractionMasks, _super);
        function InteractionMasks() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                selectedPosition: {
                    idx: -1,
                    rowIdx: -1
                },
                selectedRange: {
                    topLeft: {
                        idx: -1, rowIdx: -1
                    },
                    bottomRight: {
                        idx: -1, rowIdx: -1
                    },
                    startCell: null,
                    cursorCell: null,
                    isDragging: false
                },
                copiedPosition: null,
                draggedPosition: null,
                editorPosition: null,
                isEditorEnabled: false,
                firstEditorKeyPress: null
            };
            _this.selectionMask = react_1.default.createRef();
            _this.copyMask = react_1.default.createRef();
            _this.unsubscribeEventHandlers = [];
            _this.onKeyDown = function (e) {
                if (keyboardUtils_1.isCtrlKeyHeldDown(e)) {
                    _this.onPressKeyWithCtrl(e);
                }
                else if (e.keyCode === KeyCodes_1.default.Escape) {
                    _this.onPressEscape();
                }
                else if (e.keyCode === KeyCodes_1.default.Tab) {
                    _this.onPressTab(e);
                }
                else if (_this.isKeyboardNavigationEvent(e)) {
                    _this.changeCellFromEvent(e);
                }
                else if (keyboardUtils_1.isKeyPrintable(e.keyCode) || [KeyCodes_1.default.Backspace, KeyCodes_1.default.Delete, KeyCodes_1.default.Enter].includes(e.keyCode)) {
                    _this.openEditor(e);
                }
            };
            _this.openEditor = function (event) {
                if (_this.isSelectedCellEditable() && !_this.state.isEditorEnabled) {
                    _this.setState({
                        isEditorEnabled: true,
                        firstEditorKeyPress: event ? event.key : null,
                        editorPosition: _this.getEditorPosition()
                    });
                }
            };
            _this.onFocus = function () {
                var _a = _this.state.selectedPosition, idx = _a.idx, rowIdx = _a.rowIdx;
                if (idx === -1 && rowIdx === -1) {
                    _this.selectFirstCell();
                }
            };
            _this.selectCell = function (cell, openEditor) {
                var callback = openEditor ? _this.openEditor : undefined;
                // Close the editor to commit any pending changes
                if (_this.state.isEditorEnabled) {
                    _this.closeEditor();
                }
                _this.setState(function () {
                    if (!_this.isCellWithinBounds(cell))
                        return null;
                    return {
                        selectedPosition: cell,
                        selectedRange: {
                            topLeft: cell,
                            bottomRight: cell,
                            startCell: cell,
                            cursorCell: cell,
                            isDragging: false
                        }
                    };
                }, callback);
            };
            _this.onSelectCellRangeStarted = function (selectedPosition) {
                _this.setState({
                    selectedRange: _this.createSingleCellSelectedRange(selectedPosition, true),
                    selectedPosition: selectedPosition
                }, function () {
                    if (_this.props.onCellRangeSelectionStarted) {
                        _this.props.onCellRangeSelectionStarted(_this.state.selectedRange);
                    }
                });
            };
            _this.onSelectCellRangeUpdated = function (cellPosition, isFromKeyboard, callback) {
                if (!_this.state.selectedRange.isDragging && !isFromKeyboard || !_this.isCellWithinBounds(cellPosition)) {
                    return;
                }
                var startCell = _this.state.selectedRange.startCell || _this.state.selectedPosition;
                var colIdxs = [startCell.idx, cellPosition.idx].sort(function (a, b) { return a - b; });
                var rowIdxs = [startCell.rowIdx, cellPosition.rowIdx].sort(function (a, b) { return a - b; });
                var topLeft = { idx: colIdxs[0], rowIdx: rowIdxs[0] };
                var bottomRight = { idx: colIdxs[1], rowIdx: rowIdxs[1] };
                var selectedRange = tslib_1.__assign({}, _this.state.selectedRange, { 
                    // default the startCell to the selected cell, in case we've just started via keyboard
                    startCell: _this.state.selectedRange.startCell || _this.state.selectedPosition, 
                    // assign the new state - the bounds of the range, and the new cursor cell
                    topLeft: topLeft,
                    bottomRight: bottomRight, cursorCell: cellPosition });
                _this.setState({
                    selectedRange: selectedRange
                }, function () {
                    if (_this.props.onCellRangeSelectionUpdated) {
                        _this.props.onCellRangeSelectionUpdated(_this.state.selectedRange);
                    }
                    if (callback) {
                        callback();
                    }
                });
            };
            _this.onSelectCellRangeEnded = function () {
                var selectedRange = tslib_1.__assign({}, _this.state.selectedRange, { isDragging: false });
                _this.setState({ selectedRange: selectedRange }, function () {
                    if (_this.props.onCellRangeSelectionCompleted) {
                        _this.props.onCellRangeSelectionCompleted(_this.state.selectedRange);
                    }
                    // Focus the InteractionMasks, so it can receive keyboard events
                    _this.focus();
                });
            };
            _this.handleDragStart = function (e) {
                var selectedPosition = _this.state.selectedPosition;
                // To prevent dragging down/up when reordering rows. (TODO: is this required)
                if (selectedPosition.idx > -1) {
                    e.dataTransfer.effectAllowed = 'copy';
                    // Setting data is required to make an element draggable in FF
                    var transferData = JSON.stringify(selectedPosition);
                    try {
                        e.dataTransfer.setData('text/plain', transferData);
                    }
                    catch (ex) {
                        // IE only supports 'text' and 'URL' for the 'type' argument
                        e.dataTransfer.setData('text', transferData);
                    }
                    _this.setState({
                        draggedPosition: tslib_1.__assign({}, selectedPosition, { overRowIdx: selectedPosition.rowIdx })
                    });
                }
            };
            _this.handleDragEnter = function (overRowIdx) {
                _this.setState(function (_a) {
                    var draggedPosition = _a.draggedPosition;
                    if (draggedPosition) {
                        return { draggedPosition: tslib_1.__assign({}, draggedPosition, { overRowIdx: overRowIdx }) };
                    }
                    return null;
                });
            };
            _this.handleDragEnd = function () {
                var _a;
                var draggedPosition = _this.state.draggedPosition;
                if (draggedPosition === null)
                    return;
                var rowIdx = draggedPosition.rowIdx, overRowIdx = draggedPosition.overRowIdx;
                var _b = _this.props, columns = _b.columns, onGridRowsUpdated = _b.onGridRowsUpdated, rowGetter = _b.rowGetter;
                var column = SelectedCellUtils_1.getSelectedColumn({ selectedPosition: draggedPosition, columns: columns });
                var value = SelectedCellUtils_1.getSelectedCellValue({ selectedPosition: draggedPosition, columns: columns, rowGetter: rowGetter });
                var cellKey = column.key;
                var fromRow = rowIdx < overRowIdx ? rowIdx : overRowIdx;
                var toRow = rowIdx > overRowIdx ? rowIdx : overRowIdx;
                onGridRowsUpdated(cellKey, fromRow, toRow, (_a = {}, _a[cellKey] = value, _a), enums_1.UpdateActions.CELL_DRAG);
                _this.setState({
                    draggedPosition: null
                });
            };
            _this.onDragHandleDoubleClick = function () {
                var _a = _this.props, onDragHandleDoubleClick = _a.onDragHandleDoubleClick, rowGetter = _a.rowGetter;
                var selectedPosition = _this.state.selectedPosition;
                var idx = selectedPosition.idx, rowIdx = selectedPosition.rowIdx;
                var rowData = SelectedCellUtils_1.getSelectedRow({ selectedPosition: selectedPosition, rowGetter: rowGetter });
                onDragHandleDoubleClick({ idx: idx, rowIdx: rowIdx, rowData: rowData });
            };
            _this.onCommit = function (args) {
                _this.props.onCommit(args);
                _this.closeEditor();
            };
            _this.onCommitCancel = function () {
                _this.closeEditor();
            };
            _this.getSelectedDimensions = function (selectedPosition, useGridColumns) {
                var _a = _this.props, scrollLeft = _a.scrollLeft, getRowHeight = _a.getRowHeight, getRowTop = _a.getRowTop, getRowColumns = _a.getRowColumns, gridColumns = _a.columns;
                var columns = useGridColumns ? gridColumns : getRowColumns(selectedPosition.rowIdx);
                var top = getRowTop(selectedPosition.rowIdx);
                var rowHeight = getRowHeight(selectedPosition.rowIdx);
                var dimension = SelectedCellUtils_1.getSelectedDimensions({ selectedPosition: selectedPosition, columns: columns, scrollLeft: scrollLeft, rowHeight: rowHeight });
                dimension.top = top;
                return dimension;
            };
            return _this;
        }
        InteractionMasks.prototype.componentDidUpdate = function (prevProps, prevState) {
            var _a = this.state, selectedPosition = _a.selectedPosition, isEditorEnabled = _a.isEditorEnabled;
            var prevSelectedPosition = prevState.selectedPosition, prevIsEditorEnabled = prevState.isEditorEnabled;
            var isSelectedPositionChanged = selectedPosition !== prevSelectedPosition && (selectedPosition.rowIdx !== prevSelectedPosition.rowIdx || selectedPosition.idx !== prevSelectedPosition.idx);
            var isEditorClosed = isEditorEnabled !== prevIsEditorEnabled && !isEditorEnabled;
            if (isSelectedPositionChanged) {
                // Call event handlers if selected cell has changed
                var _b = this.props, onCellSelected = _b.onCellSelected, onCellDeSelected = _b.onCellDeSelected;
                if (onCellDeSelected && this.isCellWithinBounds(prevSelectedPosition)) {
                    onCellDeSelected(tslib_1.__assign({}, prevSelectedPosition));
                }
                if (onCellSelected && this.isCellWithinBounds(selectedPosition)) {
                    onCellSelected(tslib_1.__assign({}, selectedPosition));
                }
            }
            if ((isSelectedPositionChanged && this.isCellWithinBounds(selectedPosition)) || isEditorClosed) {
                this.focus();
            }
        };
        InteractionMasks.prototype.componentDidMount = function () {
            var _a = this.props, eventBus = _a.eventBus, enableCellAutoFocus = _a.enableCellAutoFocus;
            this.unsubscribeEventHandlers = [
                eventBus.subscribe(enums_1.EventTypes.SELECT_CELL, this.selectCell),
                eventBus.subscribe(enums_1.EventTypes.SELECT_START, this.onSelectCellRangeStarted),
                eventBus.subscribe(enums_1.EventTypes.SELECT_UPDATE, this.onSelectCellRangeUpdated),
                eventBus.subscribe(enums_1.EventTypes.SELECT_END, this.onSelectCellRangeEnded),
                eventBus.subscribe(enums_1.EventTypes.DRAG_ENTER, this.handleDragEnter)
            ];
            if (enableCellAutoFocus && this.isFocusedOnBody()) {
                this.selectFirstCell();
            }
        };
        InteractionMasks.prototype.componentWillUnmount = function () {
            this.unsubscribeEventHandlers.forEach(function (h) { return h(); });
        };
        InteractionMasks.prototype.getEditorPosition = function () {
            if (!this.selectionMask.current)
                return null;
            var editorPortalTarget = this.props.editorPortalTarget;
            var _a = this.selectionMask.current.getBoundingClientRect(), selectionMaskLeft = _a.left, selectionMaskTop = _a.top;
            if (editorPortalTarget === document.body) {
                var _b = document.scrollingElement || document.documentElement, scrollLeft_1 = _b.scrollLeft, scrollTop_1 = _b.scrollTop;
                return {
                    left: selectionMaskLeft + scrollLeft_1,
                    top: selectionMaskTop + scrollTop_1
                };
            }
            var _c = editorPortalTarget.getBoundingClientRect(), portalTargetLeft = _c.left, portalTargetTop = _c.top;
            var scrollLeft = editorPortalTarget.scrollLeft, scrollTop = editorPortalTarget.scrollTop;
            return {
                left: selectionMaskLeft - portalTargetLeft + scrollLeft,
                top: selectionMaskTop - portalTargetTop + scrollTop
            };
        };
        InteractionMasks.prototype.setMaskScollLeft = function (mask, position, scrollLeft) {
            if (!mask || !position)
                return;
            var idx = position.idx, rowIdx = position.rowIdx;
            if (!(idx >= 0 && rowIdx >= 0))
                return;
            var column = this.props.columns[idx];
            if (!ColumnUtils_1.isFrozen(column))
                return;
            var top = this.props.getRowTop(rowIdx);
            var left = scrollLeft + column.left;
            var transform = "translate(" + left + "px, " + top + "px)";
            if (mask.style.transform !== transform) {
                mask.style.transform = transform;
            }
        };
        /**
         * Sets the position of SelectionMask and CopyMask components when the canvas is scrolled
         * This is only required on the frozen columns
         */
        InteractionMasks.prototype.setScrollLeft = function (scrollLeft) {
            this.setMaskScollLeft(this.selectionMask.current, this.state.selectedPosition, scrollLeft);
            this.setMaskScollLeft(this.copyMask.current, this.state.copiedPosition, scrollLeft);
        };
        InteractionMasks.prototype.isSelectedCellEditable = function () {
            var _a = this.props, enableCellSelect = _a.enableCellSelect, columns = _a.columns, rowGetter = _a.rowGetter, onCheckCellIsEditable = _a.onCheckCellIsEditable;
            var selectedPosition = this.state.selectedPosition;
            return SelectedCellUtils_1.isSelectedCellEditable({ enableCellSelect: enableCellSelect, columns: columns, rowGetter: rowGetter, selectedPosition: selectedPosition, onCheckCellIsEditable: onCheckCellIsEditable });
        };
        InteractionMasks.prototype.closeEditor = function () {
            this.setState({
                isEditorEnabled: false,
                firstEditorKeyPress: null,
                editorPosition: null
            });
        };
        InteractionMasks.prototype.onPressKeyWithCtrl = function (_a) {
            var keyCode = _a.keyCode;
            if (this.copyPasteEnabled()) {
                if (keyCode === KeyCodes_1.default.c) {
                    var _b = this.props, columns = _b.columns, rowGetter = _b.rowGetter;
                    var selectedPosition = this.state.selectedPosition;
                    var value = SelectedCellUtils_1.getSelectedCellValue({ selectedPosition: selectedPosition, columns: columns, rowGetter: rowGetter });
                    this.handleCopy(value);
                }
                else if (keyCode === KeyCodes_1.default.v) {
                    this.handlePaste();
                }
            }
        };
        InteractionMasks.prototype.onPressTab = function (e) {
            var _a = this.props, cellNavigationMode = _a.cellNavigationMode, columns = _a.columns, rowsCount = _a.rowsCount;
            var _b = this.state, selectedPosition = _b.selectedPosition, isEditorEnabled = _b.isEditorEnabled;
            // When there are no rows in the grid, we need to allow the browser to handle tab presses
            if (rowsCount === 0) {
                return;
            }
            // If we are in a position to leave the grid, stop editing but stay in that cell
            if (SelectedCellUtils_1.canExitGrid(e, { cellNavigationMode: cellNavigationMode, columns: columns, rowsCount: rowsCount, selectedPosition: selectedPosition })) {
                if (isEditorEnabled) {
                    this.closeEditor();
                    return;
                }
                // Reset the selected position before exiting
                this.setState({ selectedPosition: { idx: -1, rowIdx: -1 } });
                return;
            }
            this.changeCellFromEvent(e);
        };
        InteractionMasks.prototype.onPressEscape = function () {
            if (this.copyPasteEnabled()) {
                this.handleCancelCopy();
                this.closeEditor();
            }
        };
        InteractionMasks.prototype.copyPasteEnabled = function () {
            return this.props.onCellCopyPaste !== null && this.isSelectedCellEditable();
        };
        InteractionMasks.prototype.handleCopy = function (value) {
            var _a = this.state.selectedPosition, rowIdx = _a.rowIdx, idx = _a.idx;
            this.setState({
                copiedPosition: { rowIdx: rowIdx, idx: idx, value: value }
            });
        };
        InteractionMasks.prototype.handleCancelCopy = function () {
            this.setState({ copiedPosition: null });
        };
        InteractionMasks.prototype.handlePaste = function () {
            var _a;
            var _b = this.props, columns = _b.columns, onCellCopyPaste = _b.onCellCopyPaste, onGridRowsUpdated = _b.onGridRowsUpdated;
            var _c = this.state, selectedPosition = _c.selectedPosition, copiedPosition = _c.copiedPosition;
            var toRow = selectedPosition.rowIdx;
            if (copiedPosition === null) {
                return;
            }
            var cellKey = SelectedCellUtils_1.getSelectedColumn({ selectedPosition: selectedPosition, columns: columns }).key;
            var fromRow = copiedPosition.rowIdx, value = copiedPosition.value;
            if (onCellCopyPaste) {
                onCellCopyPaste({
                    cellKey: cellKey,
                    rowIdx: toRow,
                    fromRow: fromRow,
                    toRow: toRow,
                    value: value
                });
            }
            onGridRowsUpdated(cellKey, toRow, toRow, (_a = {}, _a[cellKey] = value, _a), enums_1.UpdateActions.COPY_PASTE, fromRow);
        };
        InteractionMasks.prototype.isKeyboardNavigationEvent = function (e) {
            return this.getKeyNavActionFromEvent(e) !== null;
        };
        InteractionMasks.prototype.getKeyNavActionFromEvent = function (e) {
            var _a = this.props, rowVisibleEndIdx = _a.rowVisibleEndIdx, rowVisibleStartIdx = _a.rowVisibleStartIdx, colVisibleEndIdx = _a.colVisibleEndIdx, colVisibleStartIdx = _a.colVisibleStartIdx, onHitBottomBoundary = _a.onHitBottomBoundary, onHitRightBoundary = _a.onHitRightBoundary, onHitLeftBoundary = _a.onHitLeftBoundary, onHitTopBoundary = _a.onHitTopBoundary;
            var isCellAtBottomBoundary = function (cell) { return cell.rowIdx >= rowVisibleEndIdx - SCROLL_CELL_BUFFER; };
            var isCellAtTopBoundary = function (cell) { return cell.rowIdx !== 0 && cell.rowIdx <= rowVisibleStartIdx - 1; };
            var isCellAtRightBoundary = function (cell) { return cell.idx !== 0 && cell.idx >= colVisibleEndIdx - 1; };
            var isCellAtLeftBoundary = function (cell) { return cell.idx !== 0 && cell.idx <= colVisibleStartIdx + 1; };
            var ArrowDown = {
                getNext: function (current) { return (tslib_1.__assign({}, current, { rowIdx: current.rowIdx + 1 })); },
                isCellAtBoundary: isCellAtBottomBoundary,
                onHitBoundary: onHitBottomBoundary
            };
            var ArrowUp = {
                getNext: function (current) { return (tslib_1.__assign({}, current, { rowIdx: current.rowIdx - 1 })); },
                isCellAtBoundary: isCellAtTopBoundary,
                onHitBoundary: onHitTopBoundary
            };
            var ArrowRight = {
                getNext: function (current) { return (tslib_1.__assign({}, current, { idx: current.idx + 1 })); },
                isCellAtBoundary: isCellAtRightBoundary,
                onHitBoundary: function (next) {
                    onHitRightBoundary(next);
                    // Selected cell can hit the bottom boundary when the cellNavigationMode is 'changeRow'
                    if (isCellAtBottomBoundary(next)) {
                        onHitBottomBoundary(next);
                    }
                }
            };
            var ArrowLeft = {
                getNext: function (current) { return (tslib_1.__assign({}, current, { idx: current.idx - 1 })); },
                isCellAtBoundary: isCellAtLeftBoundary,
                onHitBoundary: function (next) {
                    onHitLeftBoundary(next);
                    // Selected cell can hit the top boundary when the cellNavigationMode is 'changeRow'
                    if (isCellAtTopBoundary(next)) {
                        onHitTopBoundary(next);
                    }
                }
            };
            if (e.keyCode === KeyCodes_1.default.Tab) {
                return e.shiftKey === true ? ArrowLeft : ArrowRight;
            }
            switch (e.key) {
                case 'ArrowDown': return ArrowDown;
                case 'ArrowUp': return ArrowUp;
                case 'ArrowRight': return ArrowRight;
                case 'ArrowLeft': return ArrowLeft;
                default: return null;
            }
        };
        InteractionMasks.prototype.changeCellFromEvent = function (e) {
            e.preventDefault();
            var isTab = e.keyCode === KeyCodes_1.default.Tab;
            var isShift = e.shiftKey;
            if (isTab) {
                var cellNavigationMode = this.props.cellNavigationMode === enums_1.CellNavigationMode.NONE
                    ? enums_1.CellNavigationMode.CHANGE_ROW
                    : this.props.cellNavigationMode;
                this.changeCellFromKeyAction(e, cellNavigationMode);
            }
            else if (isShift) {
                this.changeSelectedRangeFromArrowKeyAction(e);
            }
            else {
                this.changeCellFromKeyAction(e, this.props.cellNavigationMode);
            }
        };
        InteractionMasks.prototype.changeCellFromKeyAction = function (e, cellNavigationMode) {
            var keyNavAction = this.getKeyNavActionFromEvent(e);
            if (keyNavAction) {
                var currentPosition = this.state.selectedPosition;
                var next = this.getNextSelectedCellPositionForKeyNavAction(keyNavAction, currentPosition, cellNavigationMode);
                this.checkIsAtGridBoundary(keyNavAction, next);
                this.selectCell(next);
            }
        };
        InteractionMasks.prototype.changeSelectedRangeFromArrowKeyAction = function (e) {
            var _this = this;
            var keyNavAction = this.getKeyNavActionFromEvent(e);
            if (keyNavAction) {
                var cellNavigationMode = this.props.cellNavigationMode;
                var currentPosition = this.state.selectedRange.cursorCell || this.state.selectedPosition;
                var next = this.getNextSelectedCellPositionForKeyNavAction(keyNavAction, currentPosition, cellNavigationMode);
                this.checkIsAtGridBoundary(keyNavAction, next);
                this.onSelectCellRangeUpdated(tslib_1.__assign({}, next), true, function () { _this.onSelectCellRangeEnded(); });
            }
        };
        InteractionMasks.prototype.getNextSelectedCellPositionForKeyNavAction = function (keyNavAction, currentPosition, cellNavigationMode) {
            var getNext = keyNavAction.getNext;
            var nextPosition = getNext(currentPosition);
            var _a = this.props, columns = _a.columns, rowsCount = _a.rowsCount;
            return SelectedCellUtils_1.getNextSelectedCellPosition({
                columns: columns,
                rowsCount: rowsCount,
                cellNavigationMode: cellNavigationMode,
                nextPosition: nextPosition
            });
        };
        InteractionMasks.prototype.checkIsAtGridBoundary = function (keyNavAction, next) {
            var isCellAtBoundary = keyNavAction.isCellAtBoundary, onHitBoundary = keyNavAction.onHitBoundary;
            var changeRowOrColumn = next.changeRowOrColumn, nextPos = tslib_1.__rest(next, ["changeRowOrColumn"]);
            if (isCellAtBoundary(nextPos) || changeRowOrColumn) {
                onHitBoundary(nextPos);
            }
        };
        InteractionMasks.prototype.isCellWithinBounds = function (_a) {
            var idx = _a.idx, rowIdx = _a.rowIdx;
            var _b = this.props, columns = _b.columns, rowsCount = _b.rowsCount;
            return rowIdx >= 0 && rowIdx < rowsCount && idx >= 0 && idx < columns.length;
        };
        InteractionMasks.prototype.isGridSelected = function () {
            return this.isCellWithinBounds(this.state.selectedPosition);
        };
        InteractionMasks.prototype.isFocused = function () {
            return document.activeElement === this.selectionMask.current;
        };
        InteractionMasks.prototype.isFocusedOnBody = function () {
            return document.activeElement === document.body;
        };
        InteractionMasks.prototype.focus = function () {
            if (this.selectionMask.current && !this.isFocused()) {
                this.selectionMask.current.focus();
            }
        };
        InteractionMasks.prototype.selectFirstCell = function () {
            this.selectCell({ rowIdx: 0, idx: 0 });
        };
        InteractionMasks.prototype.createSingleCellSelectedRange = function (cellPosition, isDragging) {
            return {
                topLeft: cellPosition,
                bottomRight: cellPosition,
                startCell: cellPosition,
                cursorCell: cellPosition,
                isDragging: isDragging
            };
        };
        InteractionMasks.prototype.isDragEnabled = function () {
            return this.isSelectedCellEditable();
        };
        InteractionMasks.prototype.renderSingleCellSelectView = function () {
            return (!this.state.isEditorEnabled && this.isGridSelected() && (react_1.default.createElement(SelectionMask_1.default, tslib_1.__assign({}, this.getSelectedDimensions(this.state.selectedPosition, true), { ref: this.selectionMask }), this.isDragEnabled() && (react_1.default.createElement(DragHandle_1.default, { onDragStart: this.handleDragStart, onDragEnd: this.handleDragEnd, onDoubleClick: this.onDragHandleDoubleClick })))));
        };
        InteractionMasks.prototype.renderCellRangeSelectView = function () {
            var _a = this.props, columns = _a.columns, rowHeight = _a.rowHeight;
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(SelectionRangeMask_1.default, tslib_1.__assign({}, SelectedCellUtils_1.getSelectedRangeDimensions({ selectedRange: this.state.selectedRange, columns: columns, rowHeight: rowHeight }))),
                react_1.default.createElement(SelectionMask_1.default, tslib_1.__assign({}, this.getSelectedDimensions(this.state.selectedPosition, true), { ref: this.selectionMask }))));
        };
        InteractionMasks.prototype.render = function () {
            var _a = this.props, rowGetter = _a.rowGetter, contextMenu = _a.contextMenu, getRowColumns = _a.getRowColumns, scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop;
            var _b = this.state, isEditorEnabled = _b.isEditorEnabled, firstEditorKeyPress = _b.firstEditorKeyPress, selectedPosition = _b.selectedPosition, draggedPosition = _b.draggedPosition, copiedPosition = _b.copiedPosition;
            var rowData = SelectedCellUtils_1.getSelectedRow({ selectedPosition: selectedPosition, rowGetter: rowGetter });
            var columns = getRowColumns(selectedPosition.rowIdx);
            return (react_1.default.createElement("div", { onKeyDown: this.onKeyDown, onFocus: this.onFocus },
                copiedPosition && (react_1.default.createElement(CopyMask_1.default, tslib_1.__assign({}, this.getSelectedDimensions(copiedPosition), { ref: this.copyMask }))),
                draggedPosition && (react_1.default.createElement(DragMask_1.default, { draggedPosition: draggedPosition, getSelectedDimensions: this.getSelectedDimensions })),
                SelectedCellUtils_1.selectedRangeIsSingleCell(this.state.selectedRange)
                    ? this.renderSingleCellSelectView()
                    : this.renderCellRangeSelectView(),
                isEditorEnabled && (react_1.default.createElement(EditorPortal_1.default, { target: this.props.editorPortalTarget },
                    react_1.default.createElement(EditorContainer_1.default, tslib_1.__assign({ firstEditorKeyPress: firstEditorKeyPress, onCommit: this.onCommit, onCommitCancel: this.onCommitCancel, rowIdx: selectedPosition.rowIdx, value: SelectedCellUtils_1.getSelectedCellValue({ selectedPosition: selectedPosition, columns: columns, rowGetter: rowGetter }), rowData: rowData, column: SelectedCellUtils_1.getSelectedColumn({ selectedPosition: selectedPosition, columns: columns }), scrollLeft: scrollLeft, scrollTop: scrollTop }, this.getSelectedDimensions(selectedPosition), this.state.editorPosition)))),
                react_is_1.isElement(contextMenu) && react_1.cloneElement(contextMenu, tslib_1.__assign({}, selectedPosition))));
        };
        InteractionMasks.displayName = 'InteractionMasks';
        return InteractionMasks;
    }(react_1.default.Component));
    exports.default = InteractionMasks;
});
//# sourceMappingURL=InteractionMasks.js.map