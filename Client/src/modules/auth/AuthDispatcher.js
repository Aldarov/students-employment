import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export default (ChildComponent) => {
  class AuthDispatcher extends Component {
    render() {
      return (
        this.props.isAuth ?
          <ChildComponent {...this.props}/> :
          <Redirect to={{ pathname: '/login', state: { from: this.props.location } }}/>
      );
    }
  }
  AuthDispatcher.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired
  };

  function mapStateToProps(state) {
    return {
      isAuth: state.isAuth
    };
  }

  return connect(mapStateToProps)(AuthDispatcher);
};



