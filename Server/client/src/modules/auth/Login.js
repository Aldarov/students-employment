import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { loginStyles } from './styles';
import Alert from 'react-s-alert';

@withStyles(loginStyles)
class Login extends React.Component {
  componentWillMount(){
    this.props.onLogin();
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { classes } = this.props;

    return (
      this.props.isAuth
        ?
        <Redirect to={from}/>
        :
        <div className={classes.main}>
          Для доступа к сайту авторизуйтесь в <a href="http://my.bsu.ru/pg.php">личном кабинете</a>.
          <Alert stack={{limit: 5}} timeout={'none'}/>
        </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object,
  onLogin: PropTypes.func,
  location: PropTypes.object,
  isAuth: PropTypes.bool
};

export default Login;
