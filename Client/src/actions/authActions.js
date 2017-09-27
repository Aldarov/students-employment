import { apiLogin, apiLogout, apiIsAuth, apiSetRequestHeader } from '../api';
import { REQUEST_START, REQUEST_END } from './fetchingActions';
// import commonAction from './commonActions';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(args) {
  return dispatch => {
    dispatch({ type: REQUEST_START });

    return apiLogin(args)
      .then(() => {
        dispatch({ type: LOGIN });
        dispatch({ type: REQUEST_END });
      })
      .catch((error) => {
        console.log('login error - logout', error);
        dispatch(logout());
        dispatch({ type: REQUEST_END });
      });
  };
}

export function logout() {
  console.log('logout');
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
