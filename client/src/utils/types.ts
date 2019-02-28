import { MutationResult } from 'react-apollo';

export interface PartialMutationProviderOutput<
  TData extends {} = {},
  TVariables extends {} = {}
> {
  result: MutationResult<TData>;
  mutate: (variables: TVariables) => void;
}
