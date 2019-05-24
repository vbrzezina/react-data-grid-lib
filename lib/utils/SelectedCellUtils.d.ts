/// <reference types="react" />
import { CellNavigationMode } from '../common/enums';
import { CalculatedColumn, Position, Range, Dimension, RowGetter, RowData } from '../common/types';
interface getSelectedRowOpts {
    selectedPosition: Position;
    rowGetter: RowGetter;
}
export declare function getSelectedRow({ selectedPosition, rowGetter }: getSelectedRowOpts): RowData;
interface getSelectedDimensionsOpts {
    selectedPosition: Position;
    columns: CalculatedColumn[];
    rowHeight: number;
    scrollLeft: number;
}
export declare function getSelectedDimensions({ selectedPosition: { idx, rowIdx }, columns, rowHeight, scrollLeft }: getSelectedDimensionsOpts): Dimension;
interface getSelectedRangeDimensionsOpts {
    selectedRange: Range;
    columns: CalculatedColumn[];
    rowHeight: number;
}
export declare function getSelectedRangeDimensions({ selectedRange: { topLeft, bottomRight }, columns, rowHeight }: getSelectedRangeDimensionsOpts): Dimension;
interface getSelectedColumnOpts {
    selectedPosition: Position;
    columns: CalculatedColumn[];
}
export declare function getSelectedColumn({ selectedPosition, columns }: getSelectedColumnOpts): CalculatedColumn;
interface getSelectedCellValueOpts {
    selectedPosition: Position;
    columns: CalculatedColumn[];
    rowGetter: RowGetter;
}
export declare function getSelectedCellValue({ selectedPosition, columns, rowGetter }: getSelectedCellValueOpts): unknown;
interface isSelectedCellEditableOpts {
    enableCellSelect: boolean;
    selectedPosition: Position;
    columns: CalculatedColumn[];
    rowGetter: RowGetter;
    onCheckCellIsEditable?(arg: {
        row: unknown;
        column: CalculatedColumn;
    } & Position): boolean;
}
export declare function isSelectedCellEditable({ enableCellSelect, selectedPosition, columns, rowGetter, onCheckCellIsEditable }: isSelectedCellEditableOpts): boolean;
interface getNextSelectedCellPositionOpts {
    cellNavigationMode: CellNavigationMode;
    columns: CalculatedColumn[];
    rowsCount: number;
    nextPosition: Position;
}
export interface NextSelectedCellPosition extends Position {
    changeRowOrColumn: boolean;
}
export declare function getNextSelectedCellPosition({ cellNavigationMode, columns, rowsCount, nextPosition }: getNextSelectedCellPositionOpts): NextSelectedCellPosition;
interface canExitGridOpts {
    cellNavigationMode: CellNavigationMode;
    columns: CalculatedColumn[];
    rowsCount: number;
    selectedPosition: Position;
}
export declare function canExitGrid(event: React.KeyboardEvent, { cellNavigationMode, columns, rowsCount, selectedPosition: { rowIdx, idx } }: canExitGridOpts): boolean;
export declare function selectedRangeIsSingleCell({ topLeft, bottomRight }: Range): boolean;
export {};
