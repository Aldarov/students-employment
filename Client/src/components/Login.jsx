import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';

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
    return (
      <div className="Login">
        <div className="Login__banner">
          <Formsy.Form
            onValid={ this.handleValid }
            onInvalid={ this.handleInvalid }
            onValidSubmit={this.handleLogin}
            className="Login__form"
          >
            <h3>
              Вход в систему
            </h3>
            <FormsyText
              name="login"
              hintText="Введите логин"
              validations={this.validateForm('login')}
              validationErrors={this.state.validationErrors}
              floatingLabelText="Логин"
            />
            <FormsyText
              name="password"
              type="password"
              validations={this.validateForm('password')}
              validationErrors={this.state.validationErrors}
              hintText="Введите пароль"
              floatingLabelText="Пароль"
            /><br/>

            <RaisedButton label="Войти"
              primary
              type="submit"
              disabled={!this.state.canSubmit}
            />
          </Formsy.Form>
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
