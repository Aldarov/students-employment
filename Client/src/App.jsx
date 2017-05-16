import React from 'react';
import { Route, Switch } from 'react-router';

import LoginContainer from './containers/LoginContainer';
import MainContainer from './containers/MainContainer';

import 'normalize.css';
import './styles/base.scss';

function App()  {
  return (
    <Switch>
      <Route exact path='/login' component={LoginContainer} />
      <Route exact path='/' component={MainContainer} />
      <Route path='*' component={() => <div>Not Found</div>} />
    </Switch>
  );
}

export default App;
