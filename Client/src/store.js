import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { composeWithDevTools  } from 'redux-devtools-extension';

import reducers from './reducers'

const composeEnhancers = composeWithDevTools({});

export function getStore(history) {
  return createStore(reducers,
    composeEnhancers(
      applyMiddleware(promise, thunk, routerMiddleware(history))
    )
  );
}

//for production
// export function getStore(history) {
//   return createStore(reducers,
//     applyMiddleware(promise, thunk, routerMiddleware(history))
//   );
// }
