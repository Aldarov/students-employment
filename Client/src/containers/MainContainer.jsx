import React, { Component } from 'react';
import AuthHOC from './AuthHOC';
import { Switch, Route } from 'react-router-dom';

import EmploymentListContainer from './EmploymentListContainer';
import EmploymentContainer from './EmploymentContainer';

class MainContainer extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={EmploymentListContainer}/>
        <Route exact path="/employment" component={EmploymentListContainer}/>
        <Route path="/employment/:id" component={EmploymentContainer}/>
      </Switch>
    );
  }
}

export default AuthHOC(MainContainer);
