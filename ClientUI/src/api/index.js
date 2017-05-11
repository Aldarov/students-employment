export {
  apiGetTodos, apiAddTodo, apiDeleteTodos, apiEditTodo, apiToggleTodo
} from './todo';
export { apiLogin, apiLogout, apiIsAuth, apiSetRequestHeader } from './auth';

import axios from 'axios';
import { apiRefreshToken } from './auth';

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
            console.log('тут нужен редирект /login: ', error.config);
            return error.response;
          }
        });
      }
    }
    return error.response;
  }
);

