import Immutable from 'immutable';

export function isColumnsImmutable(columns: any): columns is Immutable.List<any> {
  return Immutable.List.isList(columns);
}

export function isEmptyArray(obj: any): boolean {
  return Array.isArray(obj) && obj.length === 0;
}

export function isFunction<T>(functionToCheck: T): boolean {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

export function isEmptyObject<T>(obj: T): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function isImmutableCollection<T>(objToVerify: T): boolean {
  return Immutable.Iterable.isIterable(objToVerify);
}

export function getMixedTypeValueRetriever(isImmutable: boolean) {
  return {
    getValue: isImmutable
      ? (immutable: Immutable.Map<string, any>, key: string) => immutable.get(key)
      : <T>(item: T, key: keyof T): T[typeof key] => item[key]
  };
}

export const isImmutableMap = Immutable.Map.isMap;
