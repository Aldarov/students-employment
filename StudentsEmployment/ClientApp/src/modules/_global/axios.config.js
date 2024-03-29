import axios from 'axios';
import { refreshToken, logout } from '../auth';

export const setRequestHeader = token => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

export function initAxios(store) {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.baseURL = '/';

  setRequestHeader(localStorage.getItem('accessToken'));

  axios.interceptors.response.use(
    function (response) {
      return response.data;
    },
    async error => {
      if (error.response.status === 401) {
        try {
          const token = await store.dispatch(refreshToken());
          let prev_req = error.config;
          prev_req.headers.Authorization = 'Bearer ' + token.accessToken;
          return axios(prev_req);
        } catch {
          store.dispatch(logout());
        }
      }
      if (error.response.status === 403) {
        store.dispatch(logout());
      }

      return Promise.reject(error.response);
    }
  );
}
