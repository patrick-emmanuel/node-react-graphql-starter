import React from 'react';
import { Mutation } from 'react-apollo';
import { LOGIN_USER_MUTATION } from '../mutations';

export default ({ children, onCompleted, onError }) => {
  return (
    <Mutation
      mutation={LOGIN_USER_MUTATION}
      onCompleted={onCompleted}
      onError={onError}>
      {(mutate, { data, loading, error }) => (
        children({ mutate, data, loading, error })
      )}
    </Mutation>
  )
}
