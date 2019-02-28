import React, { useContext } from 'react';
import LoginForm from './LoginForm';
import { AuthContext } from '../AuthProvider/context';

const Login = () => {
  const value = useContext(AuthContext);
  const { login, loginLoading } = value;
  return <LoginForm login={login} loading={loginLoading} />;
};

export default Login;
