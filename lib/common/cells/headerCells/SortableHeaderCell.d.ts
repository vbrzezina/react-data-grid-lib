/// <reference types="react" />
import { HeaderRowType, DEFINE_SORT } from '../../enums';
import { CalculatedColumn } from '../../types';
export interface Props {
    column: CalculatedColumn;
    rowType: HeaderRowType;
    onSort(columnKey: string, direction: DEFINE_SORT): void;
    sortDirection: DEFINE_SORT;
    sortDescendingFirst: boolean;
}
export default function SortableHeaderCell(props: Props): JSX.Element;
