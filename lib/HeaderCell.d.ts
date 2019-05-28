import * as React from 'react';
import { HeaderRowType } from './common/enums';
import { CalculatedColumn } from './common/types';
interface Props {
    renderer?: CalculatedColumn['headerRenderer'];
    column: CalculatedColumn;
    rowType: HeaderRowType;
    height: number;
    onResize(column: CalculatedColumn, width: number): void;
    onResizeEnd(column: CalculatedColumn, width: number): void;
    onHeaderDrop?(): void;
    draggableHeaderCell?: React.ComponentType<{
        column: CalculatedColumn;
        onHeaderDrop(): void;
    }>;
    className?: string;
}
export default class HeaderCell extends React.Component<Props> {
    private readonly cell;
    private onMouseDown;
    private onTouchStart;
    private onResize;
    private onResizeEnd;
    private getWidthFromMouseEvent;
    getCell(): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
    setScrollLeft(scrollLeft: number): void;
    removeScroll(): void;
    render(): JSX.Element;
}
export {};
