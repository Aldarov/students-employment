import { apiLogin, apiLogout, apiIsAuth, apiSetRequestHeader } from '../api';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(args) {
  // return dispatch => commonAction(dispatch, apiLogin(args), () => dispatch({ type: LOGIN }));
  return dispatch => apiLogin(args).then(() => dispatch({ type: LOGIN }));
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
      apiSetRequestHeader();
      dispatch({ type: LOGIN });
    } else {
      dispatch({ type: LOGOUT });
    }
  };
}
