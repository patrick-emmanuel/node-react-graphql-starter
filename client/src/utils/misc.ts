import { MutationFn, MutationResult } from 'react-apollo';
import { PartialMutationProviderOutput } from './types';

export function getMutationProviderData<TData, TVariables>(
  mutateFn: MutationFn<TData, TVariables>,
  result: MutationResult<TData>
): PartialMutationProviderOutput<TData, TVariables> {
  return {
    mutate: variables => mutateFn({ variables }),
    result
  };
}

export function maybe<T>(exp: () => T, d?: T) {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
}

interface IObject {
  [key: string]: any;
}

export function empty(obj: IObject): boolean {
  return Object.keys(obj).every(key => obj[key] === undefined);
}

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  { [K in Keys]-?: Required<Pick<T, K>> }[Keys];
