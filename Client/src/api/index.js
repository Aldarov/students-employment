export { apiLogin, apiLogout, apiIsAuth, apiSetRequestHeader } from './authApi';
export { apiGetEmploymentList, apiGetEmploymentById, apiPostEmployment } from './employmentApi';
export { apiGetSpecialities, apiGetEduForms, apiGetPgTypes, apiGetSchools } from './dictionariesApi';
export { apiGetOrganizations } from './organizationApi';

import { logout } from '../actions';

import axios from 'axios';
import { apiRefreshToken } from './authApi';

export function initAxios(store) {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.baseURL = '/';

  axios.interceptors.response.use(
    function (response) {
      return response.data;
    },
    function (error) {
      if ((error.response.status === 401) && localStorage.getItem('refresh_token')) {
        return apiRefreshToken()
          .then(token => {
            let prev_req = error.config;
            prev_req.headers.Authorization = 'Bearer ' + token.access_token;
            return axios(prev_req);
          });
      }
      if (error.response.status === 403) {
        store.dispatch(logout());
      }

      return Promise.reject(error.response);
    }
  );
}


