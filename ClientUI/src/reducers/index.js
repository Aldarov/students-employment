import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import todos, * as fromTodos  from './todo';
import filter  from './filter';
import fetching from './fetching';
import auth from './auth';

const reducer = combineReducers({
  router: routerReducer,
  todos,
  filter,
  fetching,
  isAuth: auth
});

export default reducer;

export function getFilteredTodos(state) {
  return fromTodos.getFilteredTodos(state.todos, state.filter)
}
