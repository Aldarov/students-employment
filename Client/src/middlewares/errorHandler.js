// import Alert from 'react-s-alert';

export const errorHandler = () => next => action => {
  const res = next(action);
  if (res && (typeof res.catch === 'function')) {
    return res.catch(() => {
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
