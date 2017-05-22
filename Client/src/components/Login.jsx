import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { RenderTextField } from './redux_form_fields/TextField';

import './Login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
      validationErrors: {
        login_required: 'Введите логин',
        password_required: 'Введите пароль'
      }
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleValid = this.handleValid.bind(this);
    this.handleInvalid = this.handleInvalid.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validate(values) {
    const errors = {};
    const requiredFields = [ 'login', 'password' ];
    requiredFields.forEach(field => {
      if (!values[ field ]) {
        errors[ field ] = 'Данное поле обязательное';
      }
    });

    return errors;
  }

  validateForm(item) {
    if (item == 'login') {
      return {
        login_required: function (values, value) {
          if (value) {
            return true;
          } else {
            return false;
          }
        }
      };
    }

    if (item == 'password') {
      return {
        password_required: function (values, value) {
          if (value) {
            return true;
          } else {
            return false;
          }
        }
      };
    }
  }

  handleLogin(data) {
    const login = data ? data.login : '';
    const password = data ? data.password : '';
    let from = null;
    if (this.props.location.state) {
      from = this.props.location.state.from;
    }

    if (login && password) {
      this.props.onLogin(login, password, from);
      this.setState({ login: '', password: '' });
    }
  }

  handleValid() {
    this.setState({ canSubmit: true });
  }

  handleInvalid() {
    this.setState({ canSubmit: false });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="Login">
        <div className="Login__banner">
          <form
            className="Login__form"
            onSubmit={handleSubmit}
          >
            <h3>
              Вход в систему
            </h3>
            <Field
              name="login"
              hintText="Введите логин"
              // validations={this.validateForm('login')}
              // validationErrors={this.state.validationErrors}
              floatingLabelText="Логин"
              Component={RenderTextField}
            />
            <Field
              name="password"
              type="password"
              // validations={this.validateForm('password')}
              // validationErrors={this.state.validationErrors}
              hintText="Введите пароль"
              floatingLabelText="Пароль"
              Component={RenderTextField}
            /><br/>

            <RaisedButton label="Войти"
              primary
              type="submit"
              // disabled={!this.state.canSubmit}
            />
          </form>
          <img
            className="Login__image"
            src={require('../assets/images/desk.png')}
            alt="login image"
          />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  location: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired
};

export default Login;
