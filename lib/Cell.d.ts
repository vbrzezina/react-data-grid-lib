import React from 'react';
import { CellRenderer, CellRendererProps } from './common/types';
export interface Props extends CellRendererProps {
    className?: string;
    tooltip?: string;
    cellControls?: unknown;
}
export default class Cell extends React.PureComponent<Props> implements CellRenderer {
    static defaultProps: {
        value: string;
    };
    private readonly cell;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    handleCellClick: () => void;
    handleCellMouseDown: () => void;
    handleCellMouseEnter: () => void;
    handleCellContextMenu: () => void;
    handleCellDoubleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    handleCellExpand: () => void;
    handleDeleteSubRow: () => void;
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    getStyle(): React.CSSProperties;
    getRowData(): any;
    getFormatterDependencies(): unknown;
    getCellClass(): string;
    checkScroll(): void;
    setScrollLeft(scrollLeft: number): void;
    removeScroll(): void;
    getEvents(): {
        [key: string]: Function;
    };
    getCellActions(): JSX.Element[] | null;
    renderCellContent(): JSX.Element;
    render(): JSX.Element | null;
}
