import axios from 'axios';

export function apiGetTodos() {
  return axios.get('api/todos');
}

export function apiAddTodo(title) {
  return axios.post('api/todos', { title })
    .then(response => {
      return response.data
    });
}

export function apiDeleteTodos(id) {
  return axios.delete(`api/todos/${id}`);
}

export function apiToggleTodo({...todo}) {
  return axios.put(`api/todos`, {...todo})
    .then(response => response.data);
}

export function apiEditTodo({...todo}) {
  return axios.put(`api/todos`, {...todo})
    .then(response => response.data);
}
