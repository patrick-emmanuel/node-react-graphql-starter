import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Home from './home';

import AuthProvider from './auth/AuthProvider';
import PrivateRoute from './auth/PrivateRoute';
import NotFound from './components/NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <PrivateRoute exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;
