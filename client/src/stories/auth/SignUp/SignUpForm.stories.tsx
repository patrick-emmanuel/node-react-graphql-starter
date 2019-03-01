import React from 'react';
import { storiesOf } from '@storybook/react';
import SignUpForm, { SignUpFormProps } from '../../../auth/SignUp/SignUpForm';

const loginProps: SignUpFormProps = {
  loading: false,
  signUp: (): any => undefined
};

storiesOf('auth / SignUp / SignUpForm', module)
  .add('default', () => <SignUpForm {...loginProps} />)
  .add('on loading', () => <SignUpForm {...loginProps} loading />);
