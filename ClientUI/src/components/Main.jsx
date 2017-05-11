import React from 'react';
import { Redirect } from 'react-router';

import HeaderContainer from '../containers/HeaderContainer';
import ListContainer from '../containers/ListContainer';
import FormContainer from '../containers/FormContainer';
import FilterContainer from '../containers/FilterContainer';

class Main extends React.Component {
  componentWillMount() {
    this.props.checkAuth();
    if (this.props.isAuth) {
      this.props.getTodos();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuth) {
      console.log('change props: ',nextProps.isAuth);
      this.props.getTodos();
    }
    else {
      this.props.redirectTo('/login', this.props.location.pathname);
    }
  }

  render() {
    return (
      <main>
        <HeaderContainer />
        <FilterContainer />
        <ListContainer />
        <FormContainer />
      </main>
    );
  }
}

Main.propTypes = {
  isAuth: React.PropTypes.bool.isRequired,
  redirectTo: React.PropTypes.func.isRequired,
  getTodos: React.PropTypes.func.isRequired,
  checkAuth: React.PropTypes.func.isRequired
};

export default Main;
