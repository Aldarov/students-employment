import { createStore, applyMiddleware } from 'redux';
// import { routerMiddleware } from 'react-router-redux';

import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { composeWithDevTools  } from 'redux-devtools-extension';

import reducers from './reducers';

export function getStore() {
  const middleware = applyMiddleware(
    promise,
    thunk
  );

  if (process.env.NODE_ENV === 'development') {
    return createStore(reducers, composeWithDevTools({})(middleware));
  }

  return createStore(reducers, middleware);
}
