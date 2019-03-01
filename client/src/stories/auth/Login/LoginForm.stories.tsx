import React from 'react';
import { storiesOf } from '@storybook/react';
import LoginForm, { LoginFormProps } from '../../../auth/Login/LoginForm';

const loginProps: LoginFormProps = {
  loading: false,
  login: (): any => undefined
};

storiesOf('auth / Login / LoginForm', module)
  .add('default', () => <LoginForm {...loginProps} />)
  .add('on loading', () => <LoginForm {...loginProps} loading />);
