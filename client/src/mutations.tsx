import { ApolloError } from 'apollo-client';
import { DocumentNode } from 'graphql';
import * as React from 'react';
import {
  Mutation,
  MutationFn,
  MutationResult,
  MutationUpdaterFn
} from 'react-apollo';
import MessageContext from './components/Messages';

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
      onError={error => {
        //value.pushMessage(error.message, true);
        if (onError) {
          onError(error);
        }
      }}
      variables={variables}
      update={update}
    >
      {children}
    </StrictTypedMutation>
  );
}
