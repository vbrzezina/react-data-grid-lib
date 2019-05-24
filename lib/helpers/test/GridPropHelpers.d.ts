import { CalculatedColumn } from '../../common/types';
declare const _default: {
    columns: CalculatedColumn<unknown, unknown>[];
    rowGetter(i: number): {
        id: number;
        title: string;
        count: number;
    };
    rowsCount(): number;
    cellMetaData: {
        selected: {
            idx: number;
            rowIdx: number;
        };
        dragged: null;
        copied: null;
    };
};
export default _default;
export declare const fakeCellMetaData: {
    rowKey: string;
    onCellClick: () => null;
    onCellMouseDown: () => null;
    onCellExpand: () => null;
    onCellMouseEnter: () => null;
    onCellContextMenu: () => null;
    onRowExpandToggle: () => null;
    onCellDoubleClick: () => null;
    onDragEnter: () => null;
};
