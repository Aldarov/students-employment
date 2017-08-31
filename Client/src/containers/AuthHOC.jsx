import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { checkAuth } from '../actions';

export default (ChildComponent) => {

  class AuthHOC extends Component {
    componentWillMount() {
      this.props.checkAuth();
    }

    render() {
      return (
        this.props.isAuth ? <ChildComponent/> :
          <Redirect to={{ pathname: '/login', state: { from: this.props.location } }}/>
      );
    }
  }
  AuthHOC.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    checkAuth: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
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

  return connect(mapStateToProps, mapDispatchToProps)(AuthHOC);
};



