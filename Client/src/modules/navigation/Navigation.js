import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavigationContent from './NavigationContent';
import { Login } from '../auth';

class Navigation extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={NavigationContent} />
          <Route path='*' render={() => (<div>Not found</div>)} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Navigation;
