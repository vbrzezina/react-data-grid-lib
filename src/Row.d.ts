import * as React from 'react';
import Cell from './Cell';
import { RowRenderer, RowRendererProps, CalculatedColumn } from './common/types';
export default class Row extends React.Component<RowRendererProps> implements RowRenderer {
    static displayName: string;
    static defaultProps: {
        cellRenderer: typeof Cell;
        isSelected: boolean;
        height: number;
    };
    private readonly row;
    private readonly cells;
    shouldComponentUpdate(nextProps: RowRendererProps): boolean;
    handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    getCell(column: CalculatedColumn): JSX.Element;
    getCells(): JSX.Element[];
    getRowTop(): number;
    getRowHeight(): number;
    getCellValue(key: string): any;
    getExpandableOptions(columnKey: string): {
        canExpand: boolean;
        field: string;
        expanded: boolean;
        children: any[];
        treeDepth: number;
        subRowDetails: import("./common/types").SubRowDetails<any>;
    } | undefined;
    setScrollLeft(scrollLeft: number): void;
    render(): JSX.Element;
}
