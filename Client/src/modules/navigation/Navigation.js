import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

import NavigationContent from './NavigationContent';
import { Login } from '../auth';


class Navigation extends Component {
  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/' component={NavigationContent} />
            <Route path='*' render={() => (<div>Not found</div>)} />
          </Switch>
        </BrowserRouter>
        <Alert
          stack={{limit: 5}}
          timeout={5000}
          position='bottom'
          effect='scale'
        />
      </Fragment>
    );
  }
}

export default Navigation;
