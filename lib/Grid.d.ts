import * as React from 'react';
import { HeaderProps } from './Header';
import { ViewportProps, ScrollState } from './Viewport';
import { Omit } from './common/types';
import { DEFINE_SORT } from './common/enums';
declare type SharedHeaderProps = Pick<HeaderProps, 'headerRows' | 'onColumnResize' | 'draggableHeaderCell' | 'getValidFilterValues' | 'sortDirection' | 'sortColumn' | 'onHeaderDrop'>;
export interface GridProps extends Omit<ViewportProps, 'onScroll'>, SharedHeaderProps {
    emptyRowsView?: React.ComponentType<{}>;
    scrollLeft?: number;
    onViewportKeydown(e: React.KeyboardEvent<HTMLDivElement>): void;
    onViewportKeyup(e: React.KeyboardEvent<HTMLDivElement>): void;
    onSort(columnKey: string, direction: DEFINE_SORT): void;
    onScroll?(scrollState: ScrollState): void;
}
export default class Grid extends React.Component<GridProps> {
    static displayName: string;
    private readonly header;
    private readonly viewport;
    private _scrollLeft?;
    _onScroll(): void;
    areFrozenColumnsScrolledLeft(scrollLeft: number): boolean;
    onScroll: (scrollState: ScrollState) => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
export {};
