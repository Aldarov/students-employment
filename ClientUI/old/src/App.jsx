import React from 'react';
import { Route, Switch } from 'react-router';

import LoginContainer from './containers/LoginContainer';
import MainContainer from './containers/MainContainer';

function App()  {
  return (
    <Switch>
      <Route exact path='/home' component={MainContainer} />
      <Route exact path='/login' component={LoginContainer} />
      <Route path='*' component={() => <div>Not Found</div>} />
    </Switch>
  );
}

export default App;
