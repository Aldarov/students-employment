import { apiLogin, apiLogout, apiIsAuth, apiSetRequestHeader } from '../api';
import { commonAction } from './commonActions';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(args) {
  return dispatch => commonAction(dispatch, apiLogin(args), () => dispatch({ type: LOGIN }));
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
