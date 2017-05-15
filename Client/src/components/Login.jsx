import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './Login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: ''
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleLogin(event) {
    const login = this.state.login;
    const password = this.state.password;
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

  render() {
    return (
      <div className="Login">
        <div className="Login__banner">
          <div>
            <h3>
              Вход в систему
            </h3>
            <TextField
              hintText="Введите логин"
              floatingLabelText="Логин"
              onChange={this.handleLoginChange}
            /> <br />
            <TextField
              hintText="Введите пароль"
              floatingLabelText="Пароль"
              type="password"
              onChange={this.handlePasswordChange}
            /><br />
            <RaisedButton label="Войти"
              primary
              onClick={this.handleLogin}
            />
          </div>
          <img
            className="Login__image"
            src={require("../assets/images/desk.png")}
            alt="login image"
          />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default Login;
