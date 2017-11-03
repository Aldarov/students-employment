import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import { composeWithDevTools  } from 'redux-devtools-extension';
import { errorHandler } from './middlewares';

import reducers from './reducers';

export function getStore() {
  const middleware = applyMiddleware(
    errorHandler,
    thunk,
  );

  if (process.env.NODE_ENV === 'development') {
    return createStore(reducers, composeWithDevTools({})(middleware));
  }

  return createStore(reducers, middleware);
}
