import { apiGetTodos, apiAddTodo, apiDeleteTodos, apiEditTodo, apiToggleTodo } from '../api';
import { REQUEST_START, REQUEST_END } from './fetching';

export const GET_TODOS = 'GET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const EDIT_TODO = 'EDIT_TODO';

export function getTodos() {
  return dispatch => {
    dispatch({ type: REQUEST_START });

    return apiGetTodos()
      .then(res => {
        if (res.status && res.status >= 400) {
          console.log(res);
        }
        if (res.data) {
          dispatch({ type: GET_TODOS, todos: res.data });
        }
        dispatch({ type: REQUEST_END });
      });
  };
}

export function addTodo(title) {
  return apiAddTodo(title)
    .then(todo => ({ type: ADD_TODO, todo }));
}

export function deleteTodo(id) {
  return apiDeleteTodos(id)
    .then(response => ({ type: DELETE_TODO, id }));
}

export function toggleTodo({...todo}) {
  return apiToggleTodo({...todo})
    .then(todo => ({ type: TOGGLE_TODO, todo }));
}

export function editTodo({...todo}) {
  return apiEditTodo({...todo})
    .then(todo => ({ type: EDIT_TODO, todo }));
}
