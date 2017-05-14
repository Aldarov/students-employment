import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

class Main extends React.Component {
  componentWillMount() {
    this.props.checkAuth();
    if (this.props.isAuth) {
      // here need to load a main data
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuth) {
      // here need to load a main data
    }
    else {
      this.props.redirectTo('/login', this.props.location.pathname);
    }
  }

  render() {
    return (
      <main>
        <div>Основная страница</div>
      </main>
    );
  }
}

Main.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  redirectTo: PropTypes.func.isRequired,
  checkAuth: PropTypes.func.isRequired,
};

export default Main;
