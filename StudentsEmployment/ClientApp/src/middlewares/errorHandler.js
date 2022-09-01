import { fetchingEnd } from '../modules/busyIndicator';

export const errorHandler = store => next => action => {
  const res = next(action);

  if (res && (typeof res.catch === 'function')) {
    return res.catch(() => {
      store.dispatch(fetchingEnd());
    });
  }

  return res;
};
