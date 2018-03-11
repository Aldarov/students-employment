import { apiLogin, apiLogout, apiIsAuth } from './auth.api';
import { LOGIN, LOGOUT } from '../../constants';
import { fetching } from '../busyIndicator';

export function login(args, formName) {
  return dispatch => fetching(dispatch, formName,
    apiLogin(args).then(() => dispatch({ type: LOGIN }))
  );
}

export function logout() {
  return dispatch => {
    apiLogout();
    dispatch({ type: LOGOUT });
  };
}

export function checkAuth() {
  return dispatch => {
    if (apiIsAuth()) {
      dispatch({ type: LOGIN });
    } else {
      dispatch({ type: LOGOUT });
    }
  };
}
