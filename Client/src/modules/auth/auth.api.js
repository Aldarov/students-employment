import axios from 'axios';
import { setRequestHeader } from '../_global/axios.config';

const apiSetToken = (access_token, refresh_token) => {
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', refresh_token);
}

export const apiLogin = async (args) => {
  const token = await axios.post('api/login', args);
  apiSetToken(token.access_token, token.refresh_token);
  setRequestHeader(token.access_token);
}

export const apiRefreshToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (refreshToken) {
    const token = await axios.post('api/token', { refresh_token: localStorage.getItem('refresh_token') });
    apiSetToken(token.access_token, token.refresh_token);
    setRequestHeader(token.access_token);
    return token;
  }
  throw new Error("Не найден refresh-token");
}

export const apiLogout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  setRequestHeader(null);
}

export const apiIsAuth = () => {
  if (localStorage.getItem('access_token')) {
    return true;
  } else {
    return false;
  }
}
