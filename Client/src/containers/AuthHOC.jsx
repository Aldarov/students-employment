import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export default (ChildComponent) => {

  class AuthHOC extends Component {
    render() {
      return (
        this.props.isAuth ?
          <ChildComponent/> :
          <Redirect to={{ pathname: '/login', state: { from: this.props.location } }}/>
      );
    }
  }
  AuthHOC.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired
  };

  function mapStateToProps(state) {
    return {
      isAuth: state.isAuth
    };
  }

  function mapDispatchToProps() {
    return {
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthHOC);
};



