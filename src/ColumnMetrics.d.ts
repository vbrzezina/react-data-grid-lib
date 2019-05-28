export { sameColumn } from './ColumnComparer';
import { Column, ColumnList, ColumnMetrics } from './common/types';
declare type Metrics = Pick<ColumnMetrics, 'totalWidth' | 'minColumnWidth'> & {
    columns: ColumnList;
};
export declare function recalculate(metrics: Metrics): ColumnMetrics;
/**
 * Update column metrics calculation by resizing a column.
 */
export declare function resizeColumn(metrics: ColumnMetrics, index: number, width: number): ColumnMetrics;
declare type ColumnComparer = (colA: Column, colB: Column) => boolean;
export declare function sameColumns(prevColumns: ColumnList, nextColumns: ColumnList, isSameColumn: ColumnComparer): boolean;
