import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { useSearchParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { onLogin } from './auth.actions';
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
    if (!isAuth) {
      dispatch(onLogin(employmentId, sessionId));
    }
  }, [employmentId, sessionId, isAuth]);


  if (isAuth)
    return <Navigate to={from}/>;
  else
    return <div>
      <BusyIndicator formName={formName}/>
      <div className={classes.main}>
        {
          isBusy
            ? 'Пожалуйста, подождите идет загрузка...'
            : <span>Для доступа к сайту авторизуйтесь в <a href="http://my.bsu.ru/pg.php">личном кабинете</a></span>
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
