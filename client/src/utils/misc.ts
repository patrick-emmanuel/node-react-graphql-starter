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
