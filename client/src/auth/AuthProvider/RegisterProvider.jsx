import React from 'react'
import { Mutation } from 'react-apollo'
import { REGISTER_USER_MUTATION } from '../mutations'

export default ({ children, onCompleted, onError }) => {
  return (
    <Mutation
      mutation={REGISTER_USER_MUTATION}
      onCompleted={onCompleted}
      onError={onError}>
      {(mutate, { data, loading, error }) => (
        children({ mutate, data, loading, error })
      )}
    </Mutation>
  )
};
