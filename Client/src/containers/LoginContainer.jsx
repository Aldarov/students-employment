import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import React from 'react';

import { login } from '../actions';
import Login from '../components/Login';

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (l, p, from) => dispatch(login(l, p, from))
  };
}

const LoginContainer = (onLogin) => {
  return <Login
    onSubmit={ data => {
      const login = data ? data.login : '';
      const password = data ? data.password : '';
      let from = null;
      if (this.props.location.state) {
        from = this.props.location.state.from;
      }

      if (login && password) {
        onLogin(login, password, from);
      }
    }}
  />;
};

function validate(values) {
  const errors = {};
  const requiredFields = [ 'login', 'password' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Данное поле обязательное';
    }
  });

  return errors;
}

export default reduxForm({
  form: 'LoginContainer',
  validate,
})(connect(null, mapDispatchToProps)(LoginContainer));
