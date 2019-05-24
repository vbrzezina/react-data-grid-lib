export declare const test: {
    GridPropHelpers: {
        columns: import("..").CalculatedColumn<unknown, unknown>[];
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
};
