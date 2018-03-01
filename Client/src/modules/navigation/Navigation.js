import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Layout } from '../layout';
import { Login } from '../auth';

class Navigation extends Component {
  render() {
    //const {  } = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={Layout} />
          <Route path='*' render={() => (<div>Not found</div>)} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Navigation;
