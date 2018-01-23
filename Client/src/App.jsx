import React, { Fragment }  from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Alert from 'react-s-alert';

import MainContainer from './containers/MainContainer';
import LoginContainer from './containers/LoginContainer';

import 'normalize.css';
import './styles/base.scss';

function App()  {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={LoginContainer} />
          <Route path='/' component={MainContainer} />
          <Route path='*' render = {() => (<div>Not found</div>)} />
        </Switch>
      </BrowserRouter>
      <Alert stack={{limit: 5}} timeout={'none'}/>
    </Fragment>
  );
}

export default App;
