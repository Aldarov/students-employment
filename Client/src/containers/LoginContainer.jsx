import React, { Component } from 'react';
import { connectAdvanced } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import qs from 'query-string';

import { login } from '../actions';
import Login from '../components/Login';

class LoginContainer extends Component {
  componentWillMount(){
    this.props.onLogin();
  }

  handleLogin(values) {
    const login = values ? values.login : '';
    const password = values ? values.password : '';
    if (login && password) {
      this.props.onLogin(login, password);
    }
  }

  handleValidate(values) {
    const errors = {};
    const requiredFields = [ 'login', 'password' ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Заполните данное поле';
      }
    });

    return errors;
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    return (
      this.props.isAuth ?
        <Redirect to={from}/> :
        <Login.ReduxForm
          onSubmit={this.handleLogin.bind(this)}
          validate={this.handleValidate.bind(this)}
        />
    );
  }
}
LoginContainer.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default connectAdvanced( dispatch => (state, ownProps) => {
  const {emp_id: employmentId, id: sessionId} = qs.parse(ownProps.location.search);
  const props = {
    isAuth: state.isAuth
  };

  const methods = {
    onLogin: () => dispatch(login({employmentId, sessionId}))
  };

  return { ...props, ...methods, ...ownProps };
})(LoginContainer);
