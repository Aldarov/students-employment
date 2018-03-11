import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import { EmploymentList } from '../employmentList';
import { OrganizationList } from '../organizationList';
import { Organization } from '../organization';

class NavigationContent extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/"
          component={EmploymentList}
        />
        <Route exact path="/employment"
          component={EmploymentList}
        />
        <Route exact path="/organization"
          component={OrganizationList}
        />
        {/* <Route exact path="/employment/:id"
          component={EmploymentContainer}
        /> */}
        <Route exact path="/organization/:id"
          component={Organization}
        />
      </Fragment>
    );
  }
}

export default NavigationContent;
