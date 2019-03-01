import React, { useContext } from 'react';
import SignUpForm from './SignUpForm';
import { AuthContext } from '../AuthProvider/context';

const SignUp = () => {
  const value = useContext(AuthContext);
  const { signUp, signUpLoading } = value;
  return <SignUpForm signUp={signUp} loading={signUpLoading} />;
};

export default SignUp;
