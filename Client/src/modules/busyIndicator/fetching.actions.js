import { FETCHING_START, FETCHING_END } from '../../constants';

export function fetchingStart(type) {
  return dispatch => dispatch({ type: FETCHING_START, data: type });
}

export function fetchingEnd(type) {
  return dispatch => dispatch({ type: FETCHING_END, data: type });
}
