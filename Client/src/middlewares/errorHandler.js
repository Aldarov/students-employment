// import Alert from 'react-s-alert';
import { logout } from '../actions';

export const errorHandler = store => next => action => {
  const res = next(action);
  if (res && (typeof res.catch === 'function')) {
    return res.catch(error => {
      if (error.status === 403) {
        store.dispatch(logout());
      }
      console.log('error: ', error.data);

      // if (error && error.messages) {
      //   let msg = '';
      //   error.messages['*'].forEach(el => {
      //     msg = msg + '<li>' + el + '</li>';
      //   });
      //   if (msg)
      //     Alert.error('<ul>' + msg + '</ul>', {
      //       position: 'top-right',
      //       effect: 'scale',
      //       html: true
      //     });
      // }
    });
  }

  return res;
};
