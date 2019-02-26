import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import LoginProvider from './LoginProvider';
import RegisterProvider from './RegisterProvider';
import VerifyTokenProvider from './VerifyTokenProvider';

import {
  setAuthToken,
  removeAuthToken,
  getAuthToken
} from '../../utils/auth';

export const AuthContext = React.createContext({
  login: null,
  logout: null,
  register: null,
  loginLoading: false,
  registerLoading: false,
  user: null
});


const AuthProviderOperations = ({ children, history }) => {

  const [user, setUser] = useState('');

  const onCompleted = data => {
    const { user, token } = data.login;
    setAuthToken(token);
    setUser(user);
    history.replace('/');
  }

  const onVerifyCompleted = data => {
    const { user } = data.verifyUser;
    setUser(user);
  }

  const onError = (error) => {
    logout();
  }

  const logout = () => {
    removeAuthToken();
    history.replace('/login');
    window.location.reload();
  }



  return (
    <LoginProvider 
      onCompleted={onCompleted}
      onError={onError}>
      {login => (
        <RegisterProvider 
          onCompleted={onCompleted}
          onError={onError}>
          {register => (
            <VerifyTokenProvider 
              onCompleted={onVerifyCompleted}
              onError={onError}>
              {verifyUser => (
                <AuthProvider
                  logout={logout}
                  login={login}
                  register={register}
                  verifyUser={verifyUser}
                  user={user}>
                  {children}
                </AuthProvider>
              )}
            </VerifyTokenProvider>
          )}
        </RegisterProvider>
      )}
    </LoginProvider>
  )
}

const AuthProvider = ({
  login,
  logout,
  register,
  verifyUser,
  user,
  children
}) => {
  
  const token = getAuthToken();

  useEffect(() => {
    const userToken = login.data && login.data.login ? login.data.login.token : token
    if (userToken && !login.data && !user) {
      verifyUser.mutate({ variables: { token: userToken } });
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      login: login.mutate,
      register: register.mutate,
      loginLoading: login.loading,
      registerLoading: register.loading,
      verifyAuthLoading: verifyUser.loading,
      user,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
};

export default withRouter(AuthProviderOperations);
