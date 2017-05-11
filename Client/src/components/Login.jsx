import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

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
      <div>
        <form className="login" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.login}
            placeholder="Введите логин"
            onChange={this.handleLoginChange} />
          <input
            type="password"
            value={this.state.password}
            placeholder="Введите пароль"
            onChange={this.handlePasswordChange} />

          <Button type="submit">Войти</Button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default Login;
