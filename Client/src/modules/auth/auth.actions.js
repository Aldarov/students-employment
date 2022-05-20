import { apiLogin, apiLogout, apiIsAuth } from './auth.api';
import { LOGIN, LOGOUT } from '../../constants';
import { fetchingAsync } from '../busyIndicator';
import { formName } from './Login';
import { apiRefreshToken } from './auth.api';


const onLogin = (employmentId, sessionId) => async dispatch => {
  await fetchingAsync(dispatch, formName, apiLogin({ employmentId, sessionId }));
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

const refreshToken = () => async dispatch => {
  dispatch(logout());
  const token = await fetchingAsync(dispatch, 'login', apiRefreshToken());
  return token;
}

export {
  onLogin,
  logout,
  checkAuth,
  refreshToken
};
