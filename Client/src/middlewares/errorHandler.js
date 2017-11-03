import { logout } from '../actions';

export const errorHandler = store => next => action => {
  const res = next(action);
  if (res && (typeof res.catch === 'function')) {
    return res.catch(error => {
      console.log('Ошибка', error);
      if (error.status == 403) {
        store.dispatch(logout());
      }
    });
  }

  return res;
};
