import React from 'react';
import { storiesOf } from '@storybook/react';
import LoginForm, { LoginFormProps } from '../../../auth/Login/LoginForm';
import { ApolloError } from 'apollo-client';

const loginProps: LoginFormProps = {
  loading: false,
  error: undefined,
  login: (): any => undefined
};

storiesOf('auth / Login / LoginForm', module)
  .add('default', () => <LoginForm {...loginProps} />)
  .add('on loading', () => <LoginForm {...loginProps} loading />)
  .add('on error', () => (
    <LoginForm
      {...loginProps}
      error={new ApolloError({ errorMessage: 'Invalid credentials' })}
    />
  ));
