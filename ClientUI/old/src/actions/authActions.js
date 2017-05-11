import { push } from 'react-router-redux';

import { apiLogin, apiLogout, apiIsAuth, apiSetRequestHeader } from '../api';
import { REQUEST_START, REQUEST_END } from './fetchingActions';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(login, password, from) {
  return dispatch => {
    dispatch({ type: REQUEST_START });

    return apiLogin(login, password)
      .then(() => {
        dispatch({ type: LOGIN });
        dispatch({ type: REQUEST_END });
        dispatch(push(from || '/todos'));
      })
      .catch((err) => {
        logout();
        console.log(err);
        dispatch({ type: REQUEST_END });
      });
  };
}

export function logout() {
  return dispatch => {
    apiLogout();
    return dispatch({ type: LOGOUT });
  }
}

export function checkAuth() {
  return dispatch => {
    if (apiIsAuth()) {
      apiSetRequestHeader();
      dispatch({ type: LOGIN });
    } else {
      dispatch({ type: LOGOUT });
      dispatch(push('/login'));
    }
  };
}
