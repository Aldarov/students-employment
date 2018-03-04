import {
  SET_EMPLOYMENT_LIST,
  SET_EMPLOYMENT_LIST_SORTING,
  DELETE_EMPLOYMENT,

  SET_EMPLOYMENT_SUGGESTIONS,
  CLEAR_EMPLOYMENT_SUGGESTIONS,
} from '../../constants';
import {
  apiGetEmploymentList, apiDeleteEmployment
} from './employmentList.api';

export function getEmploymentList(params, callback) {
  return dispatch => apiGetEmploymentList(params)
    .then(res => {
      dispatch({ type: SET_EMPLOYMENT_LIST, data: res });
      if (params.sorting)
        dispatch({ type: SET_EMPLOYMENT_LIST_SORTING, data: params.sorting });
      callback();
    });
}

export function deleteEmployment(id, callback) {
  return dispatch => apiDeleteEmployment(id)
    .then(() => {
      dispatch({ type: DELETE_EMPLOYMENT, data: id });
      callback();
    });
}

export function getEmploymentSuggestions(params, callback) {
  return dispatch => apiGetEmploymentList(params)
    .then(res => {
      dispatch({ type: SET_EMPLOYMENT_SUGGESTIONS, data: res.data });
      callback();
    });
}

export function clearEmploymentSuggestions() {
  return dispatch => dispatch({ type: CLEAR_EMPLOYMENT_SUGGESTIONS });
}
