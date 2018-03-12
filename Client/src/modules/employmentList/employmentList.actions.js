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
import { fetching } from '../busyIndicator';

export function getEmploymentList(params, formName) {
  return dispatch => fetching(dispatch, formName,
    apiGetEmploymentList(params).then(res => {
      dispatch({ type: SET_EMPLOYMENT_LIST, data: res });
      if (params.sorting)
        dispatch({ type: SET_EMPLOYMENT_LIST_SORTING, data: params.sorting });
      return res;
    })
  );
}

export function deleteEmployment(id, formName) {
  return dispatch => fetching(dispatch, formName,
    apiDeleteEmployment(id).then(() => {
      dispatch({ type: DELETE_EMPLOYMENT, data: id });
    })
  );
}

export function getEmploymentSuggestions(params, formName) {
  return dispatch => fetching(dispatch, formName,
    apiGetEmploymentList(params).then(res => {
      dispatch({ type: SET_EMPLOYMENT_SUGGESTIONS, data: res.data });
    })
  );
}

export function clearEmploymentSuggestions() {
  return dispatch => dispatch({ type: CLEAR_EMPLOYMENT_SUGGESTIONS });
}
