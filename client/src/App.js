import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Auth/Login';
import Register from './Auth/Register';
import Home from './Home';

import AuthProvider from './Auth/AuthProvider';
import { PrivateRoute } from './helper/auth';

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
