import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { authReducer } from './modules/auth';
import { sidebarReducer } from './modules/sidebar';
import { dialogReducer } from './modules/dialogs';
import { dictionariesReducer } from './modules/layout';
import { fetchingReducer } from './modules/busyIndicator';

import { employmentListReducer } from './modules/employmentList';
import { employmentReducer } from './modules/employment';
import { organizationListReducer } from './modules/organizationList';
import { organizationReducer } from './modules/organization';

const reducer = combineReducers({
  isAuth: authReducer,
  fetching: fetchingReducer,
  sidebar: sidebarReducer,
  dialog: dialogReducer,
  form: formReducer,
  employment: combineReducers({
    list: employmentListReducer,
    edit: employmentReducer
  }),
  organization: combineReducers({
    list: organizationListReducer,
    edit: organizationReducer
  }),
  dictionaries: dictionariesReducer,
});

export default reducer;
