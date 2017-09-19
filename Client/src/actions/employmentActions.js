import { apiGetEmploymentList, apiGetEmploymentById } from '../api';
import { REQUEST_START, REQUEST_END } from './fetchingActions';
export const GET_EMPLOYMENT_LIST = 'GET_EMPLOYMENT_LIST';
export const GET_EMPLOYMENT_SUGGESTIONS = 'GET_EMPLOYMENT_SUGGESTIONS';
export const CLEAR_EMPLOYMENT_SUGGESTIONS = 'CLEAR_EMPLOYMENT_SUGGESTIONS';
export const SET_EMPLOYMENT_LIST_SORTING = 'SET_EMPLOYMENT_LIST_SORTING';
export const GET_EMPLOYMENT_BY_ID = 'GET_EMPLOYMENT_BY_ID';

export function getEmploymentList(params) {
  return dispatch => {
    dispatch({ type: REQUEST_START });
    return apiGetEmploymentList(params)
      .then((res) => {
        dispatch({ type: GET_EMPLOYMENT_LIST, data: res.data});
        if (params.sorting)
          dispatch({ type: SET_EMPLOYMENT_LIST_SORTING, data: params.sorting });
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
    return apiGetEmploymentList(params)
      .then((res) => {
        dispatch({ type: GET_EMPLOYMENT_SUGGESTIONS, data: res.data.data });
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

export function getEmploymentById(id) {
  return dispatch => {
    dispatch({ type: REQUEST_START });
    return apiGetEmploymentById(id)
      .then((res) => {
        dispatch({ type: GET_EMPLOYMENT_BY_ID, data: res.data });
        dispatch({ type: REQUEST_END });
      })
      .catch(() => {
        dispatch({ type: REQUEST_END });
      });
  };
}
