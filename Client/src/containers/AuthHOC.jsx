import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import LoginContainer from './LoginContainer';
import { checkAuth } from '../actions';

export default (ChildComponent) => {

  class AuthHOC extends Component {
    componentWillMount() {
      this.props.checkAuth();
    }

    render() {
      return (
        this.props.isAuth ? <ChildComponent/> : <LoginContainer/>
      );
    }
  }
  AuthHOC.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    checkAuth: PropTypes.func.isRequired,
  };

  function mapStateToProps(state) {
    return {
      isAuth: state.isAuth
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      checkAuth: () => bindActionCreators(checkAuth, dispatch)
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthHOC));
};



