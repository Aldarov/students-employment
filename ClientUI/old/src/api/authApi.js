import axios from 'axios';

function apiSetToken(access_token, refresh_token) {
  sessionStorage.setItem('access_token', access_token);
  sessionStorage.setItem('refresh_token', refresh_token);
  apiSetRequestHeader(access_token);
}

export function apiSetRequestHeader(access_token) {
  const token = access_token || sessionStorage.getItem('access_token') || "";
  axios.defaults.baseURL = '/';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export function apiLogin(login, password) {
  return axios.post('api/login', { login, password })
    .then(response => {
      const token = response.data;
      apiSetToken(token.access_token, token.refresh_token);
      return token;
    });
}

export function apiRefreshToken() {
  return axios.post('api/token', { refresh_token: sessionStorage.getItem('refresh_token') })
    .then(response => {
      const token = response.data;
      apiSetToken(token.access_token, token.refresh_token);
      return token || response;
    });
}

export function apiLogout() {
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
  apiSetRequestHeader();
}

export function apiIsAuth() {
  if (sessionStorage.getItem('access_token')) {
    return true;
  } else {
    return false;
  }
}
