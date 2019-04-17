import { FETCHING_START, FETCHING_END } from '../../constants';

export function fetching(dispatch, type, action) {
  dispatch({ type: FETCHING_START, data: type });
  return action
    .then(res => {
      dispatch({ type: FETCHING_END, data: type });
      return res
    })
    .catch(err => {
      dispatch({ type: FETCHING_END, data: type });
      throw err;
    });
}

export function fetchingEnd(type) {
  return dispatch => dispatch({ type: FETCHING_END, data: type });
}
