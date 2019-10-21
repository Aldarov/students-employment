import { apiLogin, apiLogout, apiIsAuth } from './auth.api';
import { LOGIN, LOGOUT } from '../../constants';
import { fetching } from '../busyIndicator';
import { formName } from './login.container';
import throwError from '../_global/helpers/throwError';


const onLogin = (employmentId, sessionId) => () => async dispatch => {
  const res = await fetching(dispatch, formName, apiLogin({ employmentId, sessionId }));
  throwError(res);
  dispatch({ type: LOGIN });
};

const logout = () => dispatch => {
  apiLogout();
  dispatch({ type: LOGOUT });
};

const checkAuth = () => dispatch => {
  if (apiIsAuth()) {
    dispatch({ type: LOGIN });
  } else {
    dispatch({ type: LOGOUT });
  }
};

export {
  onLogin,
  logout,
  checkAuth
};
