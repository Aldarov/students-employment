import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { loginStyles } from './styles';

@withStyles(loginStyles)
class Login extends React.Component {
  componentDidMount(){
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
