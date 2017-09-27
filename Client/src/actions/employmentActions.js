import { apiGetEmploymentList, apiGetEmploymentById } from '../api';
import { commonAction } from './commonActions';

export const GET_EMPLOYMENT_LIST = 'GET_EMPLOYMENT_LIST';
export const GET_EMPLOYMENT_SUGGESTIONS = 'GET_EMPLOYMENT_SUGGESTIONS';
export const CLEAR_EMPLOYMENT_SUGGESTIONS = 'CLEAR_EMPLOYMENT_SUGGESTIONS';
export const SET_EMPLOYMENT_LIST_SORTING = 'SET_EMPLOYMENT_LIST_SORTING';
export const GET_EMPLOYMENT_BY_ID = 'GET_EMPLOYMENT_BY_ID';

export function getEmploymentList(params) {
  return dispatch =>
    commonAction(dispatch, apiGetEmploymentList(params),
      res => {
        dispatch({ type: GET_EMPLOYMENT_LIST, data: res.data });
        if (params.sorting)
          dispatch({ type: SET_EMPLOYMENT_LIST_SORTING, data: params.sorting });
      }
    );
}

export function getSearchSuggestions(params) {
  return dispatch =>
    commonAction(dispatch, apiGetEmploymentList(params),
      res => dispatch({ type: GET_EMPLOYMENT_SUGGESTIONS, data: res.data.data })
    );
}

export function clearSearchSuggestions() {
  return dispatch => {
    dispatch({ type: CLEAR_EMPLOYMENT_SUGGESTIONS });
  };
}

export function getEmploymentById(id) {
  return dispatch =>
    commonAction(dispatch, apiGetEmploymentById(id),
      res => dispatch({ type: GET_EMPLOYMENT_BY_ID, data: res.data })
    );
}
