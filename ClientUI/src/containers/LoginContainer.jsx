import React from 'react';
import { connect } from 'react-redux';

import Login from '../components/Login';
import { login } from '../actions';

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (l, p, from) => dispatch(login(l, p, from))
  };
}

export default connect(null, mapDispatchToProps)(Login);
