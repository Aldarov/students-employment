import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainContainer from './containers/MainContainer';
import LoginContainer from './containers/LoginContainer';

import 'normalize.css';
// import './styles/base.scss';

function App()  {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={LoginContainer} />
        <Route path='/' component={MainContainer} />
        <Route path='*' render = {() => (<div>Not found</div>)} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
