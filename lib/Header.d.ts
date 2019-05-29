import * as React from 'react';
import { HeaderRowProps } from './HeaderRow';
import { CalculatedColumn, ColumnMetrics, CellMetaData, HeaderRowData } from './common/types';
declare type SharedHeaderRowProps = Pick<HeaderRowProps, 'draggableHeaderCell' | 'getValidFilterValues' | 'sortDirection' | 'sortColumn' | 'onHeaderDrop' | 'onSort'>;
export interface HeaderProps extends SharedHeaderRowProps {
    columnMetrics: ColumnMetrics;
    totalWidth: number | string;
    height: number;
    headerRows: HeaderRowData[];
    onColumnResize(idx: number, width: number): void;
    cellMetaData: CellMetaData;
}
interface State {
    resizing: {
        column: CalculatedColumn;
        columnMetrics: ColumnMetrics;
    } | null;
}
export default class Header extends React.Component<HeaderProps, State> {
    readonly state: Readonly<State>;
    private readonly row;
    private readonly filterRow;
    componentWillReceiveProps(): void;
    onColumnResize: (column: CalculatedColumn<any, any>, width: number) => void;
    onColumnResizeEnd: (column: CalculatedColumn<any, any>, width: number) => void;
    getHeaderRows(): JSX.Element[];
    getColumnMetrics(): ColumnMetrics;
    getColumnPosition(column: CalculatedColumn): number | null;
    getCombinedHeaderHeights(until?: number): number;
    setScrollLeft(scrollLeft: number): void;
    onHeaderClick: () => void;
    render(): JSX.Element;
}
export {};
