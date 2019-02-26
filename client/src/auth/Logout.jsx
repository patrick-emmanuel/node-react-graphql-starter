import React from 'react'
import { AuthContext } from './AuthProvider';
import { Button } from 'semantic-ui-react';

export default () => (
  <AuthContext.Consumer>
    {({ logout }) => (
      <div className="flex justify-end mb-3">
        <Button onClick={logout}>Logout</Button>
      </div>
    )}
  </AuthContext.Consumer>
)
