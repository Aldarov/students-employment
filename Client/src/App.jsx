import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainContainer from './containers/MainContainer';

import 'normalize.css';
import './styles/base.scss';

function App()  {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={MainContainer} />
        <Route path='*' component={() => <div>Not Found</div>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
