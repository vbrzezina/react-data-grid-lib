import React, { KeyboardEvent } from 'react';
import { CalculatedColumn, Editor, RowData, CommitEvent } from '../types';
export interface Props {
    rowIdx: number;
    rowData: RowData;
    value: unknown;
    column: CalculatedColumn;
    width: number;
    height: number;
    left: number;
    top: number;
    onGridKeyDown?(e: KeyboardEvent): void;
    onCommit(e: CommitEvent): void;
    onCommitCancel(): void;
    firstEditorKeyPress: string | null;
    scrollLeft: number;
    scrollTop: number;
}
interface State {
    isInvalid: boolean;
}
export default class EditorContainer extends React.Component<Props, State> {
    static displayName: string;
    changeCommitted: boolean;
    changeCanceled: boolean;
    private readonly editor;
    readonly state: Readonly<State>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    componentWillUnmount(): void;
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
    createEditor(): JSX.Element;
    onPressEnter: () => void;
    onPressTab: () => void;
    onPressEscape: (e: React.KeyboardEvent<Element>) => void;
    onPressArrowUpOrDown: (e: React.KeyboardEvent<Element>) => void;
    onPressArrowLeft: (e: React.KeyboardEvent<Element>) => void;
    onPressArrowRight: (e: React.KeyboardEvent<Element>) => void;
    editorHasResults: () => boolean;
    editorIsSelectOpen: () => boolean;
    getRowMetaData(): unknown;
    getEditor: () => Editor<never>;
    getInputNode: () => Element | Text | null | undefined;
    getInitialValue(): unknown;
    commit: (args?: {
        key?: string | undefined;
    }) => void;
    commitCancel: () => void;
    isNewValueValid: (value: unknown) => boolean;
    isCaretAtBeginningOfInput: () => boolean;
    isCaretAtEndOfInput: () => boolean;
    handleRightClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    renderStatusIcon(): false | JSX.Element;
    render(): JSX.Element;
}
export {};
