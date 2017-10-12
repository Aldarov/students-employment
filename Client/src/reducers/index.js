import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import fetchingReducer from './fetchingReducer';
import authReducer from './authReducer';
import headerReducer from './headerReducer';
import employmentReducer from './employmentReducer';
import formEmploymentReducer from './formEmploymentReducer';
import dictionariesReducer from './dictionariesReducer';

const reducer = combineReducers({
  fetching: fetchingReducer,
  isAuth: authReducer,
  form: formReducer.plugin({
    employment: formEmploymentReducer
  }),
  header: headerReducer,
  employment: employmentReducer,
  dictionaries: dictionariesReducer
});

export default reducer;
