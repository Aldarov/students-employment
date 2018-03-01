import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools  } from 'redux-devtools-extension';

import { errorHandler } from './middlewares';
import reducers from './reducers';
import { initAxios } from './modules/_global/axios.config';

function getMiddleware() {
  const middleware = applyMiddleware(
    errorHandler,
    thunk,
  );

  if (process.env.NODE_ENV === 'development') {
    return composeWithDevTools({})(middleware);
  }
  return middleware;
}

const store = createStore(reducers, getMiddleware());
initAxios(store);

export default store;
