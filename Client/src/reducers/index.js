import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import fetchingReducer from './fetchingReducer';
import authReducer from './authReducer';
import headerReducer from './headerReducer';
import employmentReducer from './employmentReducer';
import dictionariesReducer from './dictionariesReducer';
import dialogReducer from './dialogReducer';
import organizationReducer from './organizationReducer';

const reducer = combineReducers({
  fetching: fetchingReducer,
  isAuth: authReducer,
  form: formReducer,
  header: headerReducer,
  employment: employmentReducer,
  organization: organizationReducer,
  dictionaries: dictionariesReducer,
  dialog: dialogReducer
});

export default reducer;
