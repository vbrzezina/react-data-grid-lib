import { RowData } from './common/types';
export declare function get(row: RowData, property: string): any;
interface Keys {
    rowKey?: string;
    values?: string[];
}
export declare function isRowSelected<T, K extends keyof T>(keys?: Keys | null, indexes?: number[] | null, isSelectedKey?: string | null, rowData?: T, rowIdx?: number): boolean;
export {};
