import { apiGetEmployment } from '../api';
import { REQUEST_START, REQUEST_END } from './fetchingActions';
export const GET_EMPLOYMENT_LIST = 'GET_EMPLOYMENT_LIST';
export const GET_EMPLOYMENT_SUGGESTIONS = 'GET_EMPLOYMENT_SUGGESTIONS';
export const CLEAR_EMPLOYMENT_SUGGESTIONS = 'CLEAR_EMPLOYMENT_SUGGESTIONS';

export function getEmploymentList(params) {
  return dispatch => {
    dispatch({ type: REQUEST_START });

    return apiGetEmployment(params)
      .then((res) => {
        dispatch({ type: GET_EMPLOYMENT_LIST, data: res.data});
        dispatch({ type: REQUEST_END });
      })
      .catch(() => {
        dispatch({ type: REQUEST_END });
      });
  };
}

export function getSearchSuggestions(params) {
  return dispatch => {
    dispatch({ type: REQUEST_START });
    return apiGetEmployment(params)
      .then((res) => {
        dispatch({ type: GET_EMPLOYMENT_SUGGESTIONS, data: res.data });
        dispatch({ type: REQUEST_END });
      })
      .catch(() => {
        dispatch({ type: REQUEST_END });
      });
  };
}

export function clearSearchSuggestions() {
  return dispatch => {
    dispatch({ type: CLEAR_EMPLOYMENT_SUGGESTIONS });
  };
}
