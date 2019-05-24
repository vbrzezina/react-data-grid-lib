import React from 'react';
import { RowsContainerProps } from './RowsContainer';
import EventBus from './masks/EventBus';
import { ColumnMetrics, CellMetaData, RowGetter, RowData, SubRowDetails, InteractionMasksMetaData, RowSelection } from './common/types';
import { SCROLL_DIRECTION, CellNavigationMode } from './common/enums';
interface ScrollParams {
    height: number;
    scrollTop: number;
    scrollLeft: number;
    rowsCount: number;
    rowHeight: number;
}
export interface ScrollState {
    height: number;
    scrollTop: number;
    scrollLeft: number;
    rowVisibleStartIdx: number;
    rowVisibleEndIdx: number;
    rowOverscanStartIdx: number;
    rowOverscanEndIdx: number;
    colVisibleStartIdx: number;
    colVisibleEndIdx: number;
    colOverscanStartIdx: number;
    colOverscanEndIdx: number;
    scrollDirection: SCROLL_DIRECTION;
    lastFrozenColumnIndex: number;
    isScrolling: boolean;
}
export interface ViewportProps {
    rowOffsetHeight: number;
    totalWidth: number | string;
    columnMetrics: ColumnMetrics;
    rowGetter: RowGetter;
    selectedRows?: RowData[];
    rowSelection?: RowSelection;
    rowRenderer?: React.ReactElement | React.ComponentType;
    rowsCount: number;
    rowHeight: number;
    onScroll(scrollState: ScrollState): void;
    minHeight: number;
    cellMetaData: CellMetaData;
    rowKey: string;
    scrollToRowIndex?: number;
    contextMenu?: React.ReactElement;
    getSubRowDetails?(): SubRowDetails;
    rowGroupRenderer?: React.ComponentType;
    enableCellSelect: boolean;
    enableCellAutoFocus: boolean;
    cellNavigationMode: CellNavigationMode;
    eventBus: EventBus;
    RowsContainer?: React.ComponentType<RowsContainerProps>;
    editorPortalTarget: Element;
    interactionMasksMetaData: InteractionMasksMetaData;
}
interface State {
    rowOverscanStartIdx: number;
    rowOverscanEndIdx: number;
    rowVisibleStartIdx: number;
    rowVisibleEndIdx: number;
    height: number;
    scrollTop: number;
    scrollLeft: number;
    colVisibleStartIdx: number;
    colVisibleEndIdx: number;
    colOverscanStartIdx: number;
    colOverscanEndIdx: number;
    isScrolling: boolean;
    lastFrozenColumnIndex: number;
}
export default class Viewport extends React.Component<ViewportProps, State> {
    static displayName: string;
    readonly state: Readonly<State>;
    private readonly canvas;
    private readonly viewport;
    private resetScrollStateTimeoutId;
    onScroll: ({ scrollTop, scrollLeft }: {
        scrollTop: number;
        scrollLeft: number;
    }) => void;
    getScroll(): {
        scrollTop: number;
        scrollLeft: number;
    };
    setScrollLeft(scrollLeft: number): void;
    getDOMNodeOffsetWidth(): number;
    clearScrollTimer(): void;
    getNextScrollState({ scrollTop, scrollLeft, height, rowHeight, rowsCount }: ScrollParams): ScrollState;
    resetScrollStateAfterDelay(): void;
    resetScrollStateAfterDelayCallback: () => void;
    updateScroll(scrollParams: ScrollParams): ScrollState;
    metricsUpdated: () => void;
    componentWillReceiveProps(nextProps: ViewportProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
