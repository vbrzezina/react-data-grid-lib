import Immutable from 'immutable';
export declare function isColumnsImmutable(columns: any): columns is Immutable.List<any>;
export declare function isEmptyArray(obj: any): boolean;
export declare function isFunction<T>(functionToCheck: T): boolean;
export declare function isEmptyObject<T>(obj: T): boolean;
export declare function isImmutableCollection<T>(objToVerify: T): boolean;
export declare function getMixedTypeValueRetriever(isImmutable: boolean): {
    getValue: ((immutable: Immutable.Map<string, any>, key: string) => any) | (<T>(item: T, key: keyof T) => T[keyof T]);
};
export declare const isImmutableMap: typeof Immutable.Map.isMap;
