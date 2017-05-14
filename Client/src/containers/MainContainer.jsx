import React from 'react';
import { connect } from 'react-redux';

import { getTodos, redirectTo, checkAuth } from '../actions';
import Main from '../components/Main';

function mapStateToProps(state) {
  return {
    isAuth: state.isAuth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    redirectTo: (path, from) => dispatch(redirectTo(path, from)),
    checkAuth: () => dispatch(checkAuth())
    // here need to call function for load of main data
    // getData: () => dispatch(getData())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
