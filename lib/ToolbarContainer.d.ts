import React from 'react';
import { ToolbarProps } from './common/types';
export interface ToolbarContainerProps extends ToolbarProps {
    /** Component used to render toolbar above the grid */
    toolbar?: React.ReactElement<ToolbarProps> | React.ComponentType<ToolbarProps>;
}
export default function ToolbarContainer({ toolbar, columns, rowsCount, onToggleFilter }: ToolbarContainerProps): React.ReactElement<ToolbarProps, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
