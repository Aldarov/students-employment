import axios from 'axios';

function apiSetToken(access_token, refresh_token) {
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', refresh_token);
}

export function apiLogin(args) {
  return axios.post('api/login', args)
    .then(token => {
      apiSetToken(token.access_token, token.refresh_token);
      return token;
    });
}

export function apiRefreshToken() {
  return axios.post('api/token', { refresh_token: localStorage.getItem('refresh_token') })
    .then(token => {
      apiSetToken(token.access_token, token.refresh_token);
      return token;
    });
}

export function apiLogout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

export function apiIsAuth() {
  if (localStorage.getItem('access_token')) {
    return true;
  } else {
    return false;
  }
}
