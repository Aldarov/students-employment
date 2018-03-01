import { apiLogin, apiLogout, apiIsAuth } from './auth.api';
import { LOGIN, LOGOUT } from '../../constants';

export function login(args) {
  return dispatch => apiLogin(args)
    .then(() => dispatch({ type: LOGIN }));
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
