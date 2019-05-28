/// <reference types="react" />
export interface ChildRowDeleteButtonProps {
    treeDepth: number;
    cellHeight: number;
    siblingIndex: number;
    numberSiblings: number;
    onDeleteSubRow(): void;
    isDeleteSubRowEnabled: boolean;
    allowAddChildRow?: boolean;
}
export default function ChildRowDeleteButton({ treeDepth, cellHeight, siblingIndex, numberSiblings, onDeleteSubRow, isDeleteSubRowEnabled, allowAddChildRow }: ChildRowDeleteButtonProps): JSX.Element;
