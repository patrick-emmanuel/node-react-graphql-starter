import { ApolloError } from 'apollo-client';
import { DocumentNode } from 'graphql';
import * as React from 'react';
import {
  Mutation,
  MutationFn,
  MutationResult,
  MutationUpdaterFn
} from 'react-apollo';

export interface TypedMutationInnerProps<TData, TVariables> {
  children: (
    mutateFn: MutationFn<TData, TVariables>,
    result: MutationResult<TData>
  ) => React.ReactNode;
  onCompleted?: (data: TData) => void;
  onError?: (error: ApolloError) => void;
  variables?: any; // fix the right type
}

export function TypedMutation<TData, TVariables>(
  mutation: DocumentNode,
  update?: MutationUpdaterFn<TData>
) {
  class StrictTypedMutation extends Mutation<TData, TVariables> {}
  return ({
    children,
    onCompleted,
    onError,
    variables
  }: TypedMutationInnerProps<TData, TVariables>) => (
    <StrictTypedMutation
      mutation={mutation}
      onCompleted={onCompleted}
      onError={err => {
        // Do toastr here.
        if (onError) {
          onError(err);
        }
      }}
      variables={variables}
      update={update}
    >
      {children}
    </StrictTypedMutation>
  );
}
