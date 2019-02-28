import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './auth/Login';
import Register from './auth/Register';
import Home from './home';

import AuthProvider from './auth/AuthProvider';
import { PrivateRoute } from './auth/utils';

class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/" component={Home} />
          </Switch>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;
