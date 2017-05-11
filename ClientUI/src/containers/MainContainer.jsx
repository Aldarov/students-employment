import React from 'react';
import { connect } from 'react-redux';

import Main from '../components/Main';
import { getTodos, redirectTo, checkAuth } from '../actions';

function mapStateToProps(state) {
  return {
    isAuth: state.isAuth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    redirectTo: (path, from) => dispatch(redirectTo(path, from)),
    getTodos: () => dispatch(getTodos()),
    checkAuth: () => dispatch(checkAuth())
  };
}

// const mergeProps = (stateProps, dispatchProps, ownProps) => {
//   const { is_auth } = stateProps;
//   const { dispatch } = dispatchProps;
//
//   if (is_auth) {
//     dispatch(getTodos());
//   }
//
//   return {
//     ...stateProps,
//     ...dispatchProps,
//     ...ownProps
//   };
// };

export default connect(mapStateToProps, mapDispatchToProps)(Main);
