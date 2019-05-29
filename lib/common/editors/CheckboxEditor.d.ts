/// <reference types="react" />
import { CalculatedColumn } from '../types';
export interface CheckboxEditorProps {
    value?: boolean;
    rowIdx: number;
    column: CalculatedColumn;
    dependentValues: any;
}
export default function CheckboxEditor({ value, rowIdx, column, dependentValues }: CheckboxEditorProps): JSX.Element;
