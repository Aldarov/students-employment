import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { composeWithDevTools  } from 'redux-devtools-extension';

import reducer from './reducers/index'

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options if needed
});

export function getStore(history) {
  return createStore(reducer,
    composeEnhancers(applyMiddleware(
      promise,
      thunk,
      routerMiddleware(history)
    ))
  );
}
