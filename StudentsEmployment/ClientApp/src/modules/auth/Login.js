import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { useSearchParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { onLogin, logout } from './auth.actions';
import { loginStyles } from './styles';
import { BusyIndicator } from '../busyIndicator';

const formName = 'login';

const Login = ({ classes }) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.isAuth);
  const isBusy = useSelector(state => state?.fetching?.login ?? false);

  const from = location?.state?.from ?? '/';
  const employmentId = searchParams.get('emp_id');
  const sessionId = searchParams.get('id');

  useEffect(() => {
    var employeePostId = localStorage.getItem('employeePostId');

    if (!isAuth && Boolean(employmentId) && Boolean(sessionId)) {
      dispatch(onLogin(employmentId, sessionId));
    } else if (isAuth && Boolean(employeePostId) && Boolean(employmentId) && employeePostId != employmentId) {
      dispatch(logout());
      dispatch(onLogin(employmentId, sessionId));
    }
  }, [employmentId, sessionId, isAuth]);


  if (isAuth) {
    return <Navigate to={from}/>;
  }
  else
    return <div>
      <BusyIndicator formName={formName}/>
      <div className={classes.main}>
        {
          isBusy
            ? <h3>Пожалуйста, подождите идет загрузка...</h3>
            : <h3>Для доступа к сайту авторизуйтесь в <a href="http://my.bsu.ru/pg.php">личном кабинете</a></h3>
        }
      </div>
    </div>;
};

Login.propTypes = {
  classes: PropTypes.object,
  isAuth: PropTypes.bool
};

export default withStyles(loginStyles)(Login);

export {
  formName
};
