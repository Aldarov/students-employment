import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { login } from '../actions';
import Login from '../components/Login';

class LoginContainer extends Component {
  handleLogin(data) {
    const login = data ? data.login : '';
    const password = data ? data.password : '';
    if (login && password) {
      this.props.onLogin(login, password);
    }
  }

  handleValidate(values) {
    const errors = {};
    const requiredFields = [ 'login', 'password' ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Данное поле обязательное';
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

function mapStateToProps(state) {
  return {
    isAuth: state.isAuth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (l, p) => dispatch(login(l, p))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

