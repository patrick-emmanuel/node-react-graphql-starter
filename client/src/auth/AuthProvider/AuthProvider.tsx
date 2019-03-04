import * as React from 'react';
import { getAuthToken } from '../utils';
import { AuthContext } from './context';

import { User } from '../types/User';
import { PartialMutationProviderOutput } from '../../utils/types';
import { Login, LoginVariables } from '../types/Login';
import { SignUp, SignUpVariables } from '../types/SignUp';
import { VerifyUser, VerifyUserVariables } from '../types/VerifyUser';

interface AuthProviderProps {
  login: PartialMutationProviderOutput<Login, LoginVariables>;
  signUp: PartialMutationProviderOutput<SignUp, SignUpVariables>;
  verifyUser: PartialMutationProviderOutput<VerifyUser, VerifyUserVariables>;
  logout: () => void;
  user: User;
}

const AuthProvider: React.StatelessComponent<AuthProviderProps> = ({
  login,
  logout,
  signUp,
  verifyUser,
  user,
  children
}) => {
  const token = getAuthToken();

  React.useEffect(() => {
    const { data } = login.result;
    const userToken = data && data.login ? data.login.token : token;
    if (userToken && !login && !user) {
      verifyUser.mutate({ token: userToken });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login: login.mutate,
        signUp: signUp.mutate,
        signUpError: signUp.result.error,
        loginError: login.result.error,
        loginLoading: login.result.loading,
        signUpLoading: signUp.result.loading,
        verifyAuthLoading: verifyUser.result.loading,
        user,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
