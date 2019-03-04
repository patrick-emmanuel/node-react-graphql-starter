import React from 'react';
import { storiesOf } from '@storybook/react';
import SignUpForm, { SignUpFormProps } from '../../../auth/SignUp/SignUpForm';
import { ApolloError } from 'apollo-client';

const signUpProps: SignUpFormProps = {
  loading: false,
  error: undefined,
  signUp: (): any => undefined
};

storiesOf('auth / SignUp / SignUpForm', module)
  .add('default', () => <SignUpForm {...signUpProps} />)
  .add('on loading', () => <SignUpForm {...signUpProps} loading />)
  .add('on error', () => (
    <SignUpForm
      {...signUpProps}
      error={new ApolloError({ errorMessage: 'Invalid credentials' })}
    />
  ));
