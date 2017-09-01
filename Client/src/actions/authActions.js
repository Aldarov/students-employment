import { apiLogin, apiLogout, apiIsAuth, apiSetRequestHeader } from '../api';
import { REQUEST_START, REQUEST_END } from './fetchingActions';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(login, password) {
  return dispatch => {
    dispatch({ type: REQUEST_START });

    return apiLogin(login, password)
      .then(() => {
        dispatch({ type: LOGIN });
        dispatch({ type: REQUEST_END });
      })
      .catch(() => {
        logout();
        dispatch({ type: REQUEST_END });
      });
  };
}

export function logout() {
  return dispatch => {
    apiLogout();
    return dispatch({ type: LOGOUT });
  };
}

export function checkAuth() {
  return dispatch => {
    if (apiIsAuth()) {
      apiSetRequestHeader();
      dispatch({ type: LOGIN });
    } else {
      dispatch({ type: LOGOUT });
    }
  };
}
