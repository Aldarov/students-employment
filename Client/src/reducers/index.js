import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import fetchingReducer from './fetchingReducer';
import authReducer from './authReducer';

const reducer = combineReducers({
  router: routerReducer,
  fetching: fetchingReducer,
  isAuth: authReducer
});

export default reducer;
