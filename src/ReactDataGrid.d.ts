import * as React from 'react';
import { GridProps } from './Grid';
import { CheckboxEditorProps } from './common/editors/CheckboxEditor';
import { DEFINE_SORT } from './common/enums';
import { Position, Column, CalculatedColumn, CellMetaData, InteractionMasksMetaData, ColumnMetrics, RowData, SelectedRange, RowSelection, HeaderRowData, AddFilterEvent, ColumnList, CommitEvent, GridRowsUpdatedEvent, RowSelectionParams } from './common/types';
declare type SharedGridProps = Pick<GridProps, 
/** The primary key property of each row */
'rowKey'
/** The height of each row in pixels */
 | 'rowHeight' | 'rowRenderer' | 'rowGroupRenderer'
/** A function called for each rendered row that should return a plain key/value pair object */
 | 'rowGetter'
/** The number of rows to be rendered */
 | 'rowsCount'
/** The minimum height of the grid in pixels */
 | 'minHeight'
/** When set, grid will scroll to this row index */
 | 'scrollToRowIndex'
/** Component used to render a context menu. react-data-grid-addons provides a default context menu which may be used*/
 | 'contextMenu'
/** Used to toggle whether cells can be selected or not */
 | 'enableCellSelect'
/** Toggles whether cells should be autofocused */
 | 'enableCellAutoFocus' | 'cellNavigationMode'
/** The node where the editor portal should mount. */
 | 'editorPortalTarget'
/** The key of the column which is currently being sorted */
 | 'sortColumn'
/** The direction to sort the sortColumn*/
 | 'sortDirection'
/** Called when the grid is scrolled */
 | 'onScroll'
/** Component used to render a draggable header cell */
 | 'draggableHeaderCell' | 'getValidFilterValues' | 'RowsContainer' | 'emptyRowsView' | 'onHeaderDrop' | 'getSubRowDetails'>;
declare type SharedCellMetaData = Pick<CellMetaData, 
/** Function called on each cell render to render a list of actions for each cell */
'getCellActions'
/** Called whenever a sub row is deleted from the grid */
 | 'onDeleteSubRow'
/** Called whenever a sub row is added to the grid */
 | 'onAddSubRow'
/** Function called whenever a cell has been expanded */
 | 'onCellExpand' | 'onRowExpandToggle'>;
declare type SharedInteractionMasksMetaData = Pick<InteractionMasksMetaData, 
/** Deprecated: Function called when grid is updated via a copy/paste. Use onGridRowsUpdated instead*/
'onCellCopyPaste'
/** Function called whenever a cell is selected */
 | 'onCellSelected'
/** Function called whenever a cell is deselected */
 | 'onCellDeSelected'
/** called before cell is set active, returns a boolean to determine whether cell is editable */
 | 'onCheckCellIsEditable'>;
interface Props extends SharedGridProps, SharedCellMetaData, SharedInteractionMasksMetaData {
    /** An array of objects representing each column on the grid. Can also be an ImmutableJS object */
    columns: ColumnList;
    /** The minimum width of the grid in pixels */
    minWidth?: number;
    /** The height of the header row in pixels */
    headerRowHeight?: number;
    /** The height of the header filter row in pixels */
    headerFiltersHeight: number;
    /** Deprecated: Legacy prop to turn on row selection. Use rowSelection props instead*/
    enableRowSelect: boolean | string;
    /** Component used to render toolbar above the grid */
    toolbar?: React.ReactElement;
    cellRangeSelection?: {
        onStart(selectedRange: SelectedRange): void;
        onUpdate?(selectedRange: SelectedRange): void;
        onComplete?(selectedRange: SelectedRange): void;
    };
    /** Minimum column width in pixels */
    minColumnWidth: number;
    /** Component to render the UI in the header row for selecting all rows  */
    selectAllRenderer?: React.ComponentType;
    /** Function called whenever row is clicked */
    onRowClick?(rowIdx: number, rowData: RowData, column: CalculatedColumn): void;
    /** Function called whenever row is double clicked */
    onRowDoubleClick?(rowIdx: number, rowData: RowData, column: CalculatedColumn): void;
    onAddFilter?(e: AddFilterEvent): void;
    onClearFilters?(): void;
    /** Function called whenever grid is sorted*/
    onGridSort?: GridProps['onSort'];
    /** Function called whenever keyboard key is released */
    onGridKeyUp?(e: React.KeyboardEvent<HTMLDivElement>): void;
    /** Function called whenever keyboard key is pressed down */
    onGridKeyDown?(e: React.KeyboardEvent<HTMLDivElement>): void;
    onRowSelect?(rowData: RowData[]): void;
    columnEquality(c1: Column, c2: Column): boolean;
    rowSelection?: {
        enableShiftSelect?: boolean;
        /** Function called whenever rows are selected */
        onRowsSelected?(args: RowSelectionParams[]): void;
        /** Function called whenever rows are deselected */
        onRowsDeselected?(args: RowSelectionParams[]): void;
        /** toggle whether to show a checkbox in first column to select rows */
        showCheckbox?: boolean;
        /** Method by which rows should be selected */
        selectBy: RowSelection;
    };
    /** Custom checkbox formatter */
    rowActionsCell?: React.ComponentType<CheckboxEditorProps>;
    /**
     * Callback called whenever row data is updated
     * When editing is enabled, this callback will be called for the following scenarios
     * 1. Using the supplied editor of the column. The default editor is the [SimpleTextEditor](https://github.com/adazzle/react-data-grid/blob/master/packages/common/editors/SimpleTextEditor.js).
     * 2. Copy/pasting the value from one cell to another <kbd>CTRL</kbd>+<kbd>C</kbd>, <kbd>CTRL</kbd>+<kbd>V</kbd>
     * 3. Update multiple cells by dragging the fill handle of a cell up or down to a destination cell.
     * 4. Update all cells under a given cell by double clicking the cell's fill handle.
     */
    onGridRowsUpdated?<V>(event: GridRowsUpdatedEvent<V>): void;
    /** Called when a column is resized */
    onColumnResize?(idx: number, width: number): void;
}
declare type DefaultProps = Pick<Props, 'enableCellSelect' | 'rowHeight' | 'headerFiltersHeight' | 'enableRowSelect' | 'minHeight' | 'rowKey' | 'cellNavigationMode' | 'enableCellAutoFocus' | 'minColumnWidth' | 'columnEquality' | 'editorPortalTarget'>;
interface State {
    columnMetrics: ColumnMetrics;
    lastRowIdxUiSelected: number;
    selectedRows: RowData[];
    canFilter?: boolean;
    sortColumn?: string;
    sortDirection?: DEFINE_SORT;
}
/** Main API Component to render a data grid of rows and columns
 *
 * Example code
 * -----
 *
 * ```javascript
 * <ReactDataGrid
 *   columns={columns}
 *   rowGetter={i => rows[i]}
 *   rowsCount={3} />
 * ```
*/
export default class ReactDataGrid extends React.Component<Props, State> {
    static displayName: string;
    static defaultProps: DefaultProps;
    private readonly grid;
    private readonly base;
    private readonly selectAllCheckbox;
    private readonly eventBus;
    private readonly _keysDown;
    private _cachedColumns?;
    private _cachedComputedColumns?;
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: Props): void;
    selectCell({ idx, rowIdx }: Position, openEditor?: boolean): void;
    gridWidth(): number;
    getTotalWidth(): number;
    getColumn(idx: number): CalculatedColumn<any, any>;
    getSize(): number;
    metricsUpdated: () => void;
    createColumnMetrics(props?: Readonly<Props> & Readonly<{
        children?: React.ReactNode;
    }>): ColumnMetrics;
    isSingleKeyDown(keyCode: number): boolean;
    handleColumnResize: (idx: number, width: number) => void;
    handleDragEnter: (overRowIdx: number) => void;
    handleViewportKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    handleViewportKeyUp: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    handlerCellClick: ({ rowIdx, idx }: Position) => void;
    handleCellMouseDown: (position: Position) => void;
    handleCellMouseEnter: (position: Position) => void;
    handleWindowMouseUp: () => void;
    handleCellContextMenu: (position: Position) => void;
    handleCellDoubleClick: ({ rowIdx, idx }: Position) => void;
    handleToggleFilter: () => void;
    handleDragHandleDoubleClick: InteractionMasksMetaData['onDragHandleDoubleClick'];
    handleGridRowsUpdated: InteractionMasksMetaData['onGridRowsUpdated'];
    handleCommit: (commit: CommitEvent<never>) => void;
    handleSort: (sortColumn: string, sortDirection: DEFINE_SORT) => void;
    getSelectedRow(rows: RowData[], key: any): RowData | undefined;
    useNewRowSelection: () => {
        indexes?: number[] | undefined;
    } | {
        isSelectedKey?: string | undefined;
    } | {
        keys?: {
            values: any[];
            rowKey: string;
        } | undefined;
    } | undefined;
    handleShiftSelect: (rowIdx: number) => boolean;
    handleNewRowSelect: (rowIdx: number, rowData: RowData) => void;
    handleRowSelect: (rowIdx: number, columnKey: string, rowData: RowData, event: React.ChangeEvent<HTMLInputElement>) => void;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLElement>) => void;
    getRowOffsetHeight(): number;
    getHeaderRows(): HeaderRowData[];
    getRowSelectionProps(): {
        indexes?: number[] | undefined;
    } | {
        isSelectedKey?: string | undefined;
    } | {
        keys?: {
            values: any[];
            rowKey: string;
        } | undefined;
    } | undefined;
    getSelectedRows(): RowData[] | undefined;
    openCellEditor(rowIdx: number, idx: number): void;
    scrollToColumn(colIdx: number): void;
    setupGridColumns(props?: Readonly<Props> & Readonly<{
        children?: React.ReactNode;
    }>): ColumnList;
    render(): JSX.Element;
}
export declare type ReactDataGridProps = JSX.LibraryManagedAttributes<typeof ReactDataGrid, Props>;
export {};
