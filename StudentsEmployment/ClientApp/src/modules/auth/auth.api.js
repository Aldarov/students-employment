import axios from 'axios';
import { setRequestHeader } from '../_global/axios.config';

const apiSetToken = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export const apiLogin = async (args) => {
  const token = await axios.post('api/login', args);
  apiSetToken(token.accessToken, token.refreshToken);
  setRequestHeader(token.accessToken);
}

export const apiRefreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken) {
    const token = await axios.post('api/token', { refreshToken: localStorage.getItem('refreshToken') });
    apiSetToken(token.accessToken, token.refreshToken);
    setRequestHeader(token.accessToken);
    return token;
  }
  throw new Error("Не найден refresh-token");
}

export const apiLogout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  setRequestHeader('');
}

export const apiIsAuth = () => {
  if (localStorage.getItem('accessToken')) {
    return true;
  } else {
    return false;
  }
}
