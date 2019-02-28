import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider/context';

export default () => {
  const value = useContext(AuthContext);
  const { logout } = value;
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
