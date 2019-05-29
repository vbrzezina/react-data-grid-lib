import * as React from 'react';
import { HeaderRowType, HeaderCellType, DEFINE_SORT } from './common/enums';
import { CalculatedColumn, AddFilterEvent } from './common/types';
export interface HeaderRowProps {
    width?: number;
    height: number;
    columns: CalculatedColumn[];
    onSort(columnKey: string, direction: DEFINE_SORT): void;
    onColumnResize(column: CalculatedColumn, width: number): void;
    onColumnResizeEnd(column: CalculatedColumn, width: number): void;
    style?: React.CSSProperties;
    sortColumn?: string;
    sortDirection?: DEFINE_SORT;
    filterable?: boolean;
    onFilterChange?(args: AddFilterEvent): void;
    rowType: HeaderRowType;
    draggableHeaderCell?: React.ComponentType<{
        column: CalculatedColumn;
        onHeaderDrop(): void;
    }>;
    onHeaderDrop?(): void;
    getValidFilterValues?(): any[];
}
export default class HeaderRow extends React.Component<HeaderRowProps> {
    static displayName: string;
    private readonly cells;
    shouldComponentUpdate(nextProps: HeaderRowProps): boolean;
    getHeaderCellType(column: CalculatedColumn): HeaderCellType;
    getFilterableHeaderCell(column: CalculatedColumn): JSX.Element;
    getSortableHeaderCell(column: CalculatedColumn): JSX.Element;
    getHeaderRenderer(column: CalculatedColumn): JSX.Element | React.ComponentClass<import("./common/types").HeaderRowProps<any, any>, any> | React.FunctionComponent<import("./common/types").HeaderRowProps<any, any>> | undefined;
    getCells(): JSX.Element[];
    setScrollLeft(scrollLeft: number): void;
    render(): JSX.Element;
}
