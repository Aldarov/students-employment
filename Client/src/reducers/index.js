import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import fetchingReducer from './fetchingReducer';
import authReducer from './authReducer';

const reducer = combineReducers({
  // router: routerReducer,
  fetching: fetchingReducer,
  isAuth: authReducer,
  form: formReducer
});

export default reducer;
