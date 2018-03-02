import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { authReducer } from './modules/auth';
import { sidebarReducer } from './modules/sidebar';
import { dialogReducer } from './modules/dialogs';
import { dictionariesReducer } from './modules/layout';
import { fetchingReducer } from './modules/busyIndicator';

// import employmentReducer from './employmentReducer';
// import organizationReducer from './organizationReducer';

const reducer = combineReducers({
  isAuth: authReducer,
  form: formReducer,
  sidebar: sidebarReducer,
  dialog: dialogReducer,
  dictionaries: dictionariesReducer,
  fetching: fetchingReducer,

  // employment: employmentReducer,
  // organization: organizationReducer,
});

export default reducer;
