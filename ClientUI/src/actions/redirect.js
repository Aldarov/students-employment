import { push } from 'react-router-redux';

export function redirectTo(path, from) {
  return dispatch => dispatch(push(path, { from }));
}
