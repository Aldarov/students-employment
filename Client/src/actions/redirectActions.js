// import { push } from 'react-router-dom';

export function redirectTo(path, from) {
  // return dispatch => dispatch(push(path, { from }));
  return dispatch => dispatch({ type: 'REQUEST_END', from });
}
