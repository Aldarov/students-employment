import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';

import './Login.scss';

// const errorMessages = {
//     isRequiredLogin: 'Введите имя пользователя',
//     isRequiredPassword: 'Введите пароль'
//   };

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // login: '',
      // password: '',
      canSubmit: true,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
    // this.errorMessages = this.errorMessages.bind(this);
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

  handleLoginChange(event) {
    this.setState({ login: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  notifyFormError(data) {
    console.error('Ошибки:', data);
  }

  render() {
    return (
      <div className="Login">
        <div className="Login__banner">
          <Formsy.Form
            // onValid={ this.setState({canSubmit: true}) }
            // onInvalid={ this.setState({canSubmit: false}) }
            onValidSubmit={this.handleLogin}
            onInvalidSubmit={this.notifyFormError}
            className="Login__form"
          >
            <h3>
              Вход в систему
            </h3>
            <FormsyText
              name="login"
              hintText="Введите логин"
              validations={{minLength: 3}}
              validationErrors={{
                minLength: 'Длина не менее 3',
                isEmptyString: 'Введите имя пользователя'
              }}
              floatingLabelText="Логин"
              // onChange={this.handleLoginChange}
            />
            <FormsyText
              name="password"
              type="password"
              // validations={{ isEmptyString: true }}
              // validationError={this.errorMessages.isRequiredPassword}
              hintText="Введите пароль"
              floatingLabelText="Пароль"
              // onChange={this.handlePasswordChange}
            />

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
