import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { authReducer } from './modules/auth';
import { sidebarReducer } from './modules/sidebar';
import { dialogReducer } from './modules/dialogs';
import { dictionariesReducer } from './modules/layout';
import { fetchingReducer } from './modules/busyIndicator';

import { employmentListReducer } from './modules/employmentList';
import { organizationListReducer } from './modules/organizationList';
import { organizationReducer } from './modules/organization';

const reducer = combineReducers({
  isAuth: authReducer,
  form: formReducer,
  sidebar: sidebarReducer,
  dialog: dialogReducer,
  dictionaries: dictionariesReducer,
  fetching: fetchingReducer,

  employment: combineReducers({
    list: employmentListReducer,
  }),
  organization: combineReducers({
    list: organizationListReducer,
    edit: organizationReducer
  }),
});

export default reducer;
