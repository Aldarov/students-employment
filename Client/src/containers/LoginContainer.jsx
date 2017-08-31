import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { login } from '../actions';
import Login from '../components/Login';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
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
    }

  }

  render () {
    return <Login.ReduxForm onSubmit={this.handleLogin} />;
  }
}

LoginContainer.propTypes = {
  location: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (l, p, from) => bindActionCreators(login(l, p, from), dispatch)
  };
}

export default connect(null, mapDispatchToProps)(withRouter(LoginContainer));
