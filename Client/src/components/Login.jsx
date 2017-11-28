import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends React.Component {
  componentWillMount(){
    this.props.onLogin();
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    return (
      this.props.isAuth
        ?
        <Redirect to={from}/>
        :
        <div style={{
          margin: '30px auto',
          textAlign: 'center'
        }}>
          Для доступа к сайту авторизуйтесь в <a href="http://my.bsu.ru/pg.php">личном кабинете</a>.
        </div>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func,
  location: PropTypes.object,
  isAuth: PropTypes.bool
};

export default Login;
