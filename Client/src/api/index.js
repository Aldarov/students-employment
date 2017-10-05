export { apiLogin, apiLogout, apiIsAuth, apiSetRequestHeader } from './authApi';
export { apiGetEmploymentList, apiGetEmploymentById } from './employmentApi';
export { apiLoadSpecialities } from './dictionariesApi';

import axios from 'axios';
import { apiRefreshToken } from './authApi';

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      if (sessionStorage.getItem('refresh_token')) {
        return apiRefreshToken().then(token => {
          if (token.access_token) {
            let prev_req = error.config;
            prev_req.headers.Authorization = 'Bearer ' + token.access_token;
            return axios(prev_req);
          } else {
            return Promise.reject(error.response);
          }
        });
      }
    }
    return Promise.reject(error.response);
  }
);
