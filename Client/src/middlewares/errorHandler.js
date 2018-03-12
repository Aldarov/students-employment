import Alert from 'react-s-alert';
import { fetchingEnd } from '../modules/busyIndicator';

export const errorHandler = store => next => action => {
  const res = next(action);

  if (res && (typeof res.catch === 'function')) {
    return res.catch(error => {
      store.dispatch(fetchingEnd());

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
