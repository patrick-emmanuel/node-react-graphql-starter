import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';

import { ApolloQueryResult } from 'apollo-client';
import { RequireAtLeastOne } from './utils/misc';

export interface LoadMore<TData, TVariables> {
  loadMore: (
    mergeFunc: (prev: TData, next: TData) => TData,
    extraVariables: RequireAtLeastOne<TVariables>
  ) => Promise<ApolloQueryResult<TData>>;
}

interface TypedQueryInnerProps<TData, TVariables> {
  children: (
    result: QueryResult<TData, TVariables> & LoadMore<TData, TVariables>
  ) => React.ReactNode;
  displayLoader?: boolean;
  skip?: boolean;
  variables?: any; // fix the right type
  require?: Array<keyof TData>;
}

interface QueryProgressProps {
  loading: boolean;
  onLoading: () => void;
  onCompleted: () => void;
  children: React.ReactNode;
}

export function TypedQuery<TData, TVariables>(query: DocumentNode) {
  class StrictTypedQuery extends Query<TData, TVariables> {}
  return ({
    children,
    skip,
    variables,
    displayLoader
  }: TypedQueryInnerProps<TData, TVariables>) => (
    <StrictTypedQuery
      fetchPolicy="cache-and-network"
      query={query}
      variables={variables}
      skip={skip}
      context={{ useBatching: true }}
    >
      {queryData => {
        if (queryData.error) {
          console.log(queryData.error.message);
        }

        const loadMore = (
          mergeFunc: (previousResults: TData, fetchMoreResult: TData) => TData,
          extraVariables: RequireAtLeastOne<TVariables>
        ) =>
          queryData.fetchMore({
            query,
            updateQuery: (previousResults, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResults;
              }
              return mergeFunc(previousResults, fetchMoreResult);
            },
            variables: { ...variables, ...extraVariables }
          });

        return children({
          ...queryData,
          loadMore
        });
      }}
    </StrictTypedQuery>
  );
}
