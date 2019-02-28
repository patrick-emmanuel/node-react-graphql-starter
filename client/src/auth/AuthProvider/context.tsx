import * as React from 'react';

import { SignUpVariables } from '../types/SignUp';
import { LoginVariables } from '../types/Login';
import { User } from '../types/User';

interface AuthContext {
  login: (variables: LoginVariables) => void;
  signUp: (variables: SignUpVariables) => void;
  logout: () => void;
  verifyAuthLoading: boolean;
  signUpLoading: boolean;
  loginLoading: boolean;
  user: User;
}

export const AuthContext = React.createContext<AuthContext>({
  login: undefined,
  signUp: undefined,
  logout: null,
  loginLoading: false,
  verifyAuthLoading: false,
  signUpLoading: false,
  user: undefined
});