import Immutable from 'immutable';
import { Column, CalculatedColumn, RowData } from './common/types';
export declare function getSize<T>(columns: T[] | Immutable.List<T>): number;
export declare function canEdit(column: CalculatedColumn, rowData: RowData, enableCellSelect?: boolean): boolean;
export declare function isFrozen(column: Column | CalculatedColumn): boolean;
