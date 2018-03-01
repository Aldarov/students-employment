import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { authReducer } from './modules/auth';
// import fetchingReducer from './fetchingReducer';
// import headerReducer from './headerReducer';
// import employmentReducer from './employmentReducer';
// import dictionariesReducer from './dictionariesReducer';
// import dialogReducer from './dialogReducer';
// import organizationReducer from './organizationReducer';

const reducer = combineReducers({
  isAuth: authReducer,
  form: formReducer,
  // fetching: fetchingReducer,
  // header: headerReducer,
  // employment: employmentReducer,
  // organization: organizationReducer,
  // dictionaries: dictionariesReducer,
  // dialog: dialogReducer
});

export default reducer;
