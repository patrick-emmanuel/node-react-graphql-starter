import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { setAuthToken, removeAuthToken } from '../utils';
import {
  TypedLoginMutation,
  TypedSignUpMutation,
  TypedVerifyTokenMutation
} from '../mutations';
import { getMutationProviderData } from '../../utils/misc';
import { User } from '../types/User';
import { ApolloError } from 'apollo-client';
import { Login } from '../types/Login';
import { SignUp } from '../types/SignUp';
import { VerifyUser } from '../types/VerifyUser';
import AuthProvider from './AuthProvider';

interface AuthProviderOperationsProps extends RouteComponentProps {
  children: React.ReactNode;
}

const AuthProviderOperations: React.StatelessComponent<
  AuthProviderOperationsProps
> = ({ children, history }) => {
  const [user, setUser] = React.useState<User>(null);

  const onLoginCompleted = (data: Login) => {
    const { user, token } = data.login;
    authenticate(token, user);
  };

  const onSignUpCompleted = (data: SignUp) => {
    const { user, token } = data.signup;
    authenticate(token, user);
  };

  const authenticate = (token: string, user: User): void => {
    setAuthToken(token);
    setUser(user);
    history.replace('/');
  };

  const onVerifyCompleted = (data: VerifyUser) => {
    const { user } = data.verifyUser;
    setUser(user);
  };

  const onError = (error: ApolloError) => {
    removeAuthToken();
  };

  const logout = () => {
    removeAuthToken();
    history.replace('/login');
    window.location.reload();
  };

  return (
    <TypedLoginMutation onCompleted={onLoginCompleted} onError={onError}>
      {(...login) => (
        <TypedSignUpMutation onCompleted={onSignUpCompleted} onError={onError}>
          {(...signUp) => (
            <TypedVerifyTokenMutation
              onCompleted={onVerifyCompleted}
              onError={onError}
            >
              {(...verifyUser) => (
                <AuthProvider
                  login={getMutationProviderData(...login)}
                  signUp={getMutationProviderData(...signUp)}
                  verifyUser={getMutationProviderData(...verifyUser)}
                  logout={logout}
                  user={user}
                >
                  {children}
                </AuthProvider>
              )}
            </TypedVerifyTokenMutation>
          )}
        </TypedSignUpMutation>
      )}
    </TypedLoginMutation>
  );
};

export default withRouter(AuthProviderOperations);
