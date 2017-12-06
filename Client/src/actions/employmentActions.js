import { fetchingAction } from './';
import { apiGetEmploymentList, apiGetEmploymentById, apiGetSpecialities } from '../api';
import { initialize } from 'redux-form';

export const GET_EMPLOYMENT_LIST = 'GET_EMPLOYMENT_LIST';
export const GET_EMPLOYMENT_SUGGESTIONS = 'GET_EMPLOYMENT_SUGGESTIONS';
export const CLEAR_EMPLOYMENT_SUGGESTIONS = 'CLEAR_EMPLOYMENT_SUGGESTIONS';
export const SET_EMPLOYMENT_LIST_SORTING = 'SET_EMPLOYMENT_LIST_SORTING';
export const GET_SPECIALITIES_SUGGESTIONS = 'GET_SPECIALITIES_SUGGESTIONS';
export const CLEAR_SPECIALITIES_SUGGESTIONS = 'CLEAR_SPECIALITIES_SUGGESTIONS';

export function getEmploymentList(params) {
  return dispatch => fetchingAction(dispatch,
    apiGetEmploymentList(params)
      .then(res => {
        dispatch({ type: GET_EMPLOYMENT_LIST, data: res });
        if (params.sorting)
          dispatch({ type: SET_EMPLOYMENT_LIST_SORTING, data: params.sorting });
      })
  );
}

export function getEmploymentSuggestions(params) {
  return dispatch => apiGetEmploymentList(params)
    .then(res =>
      dispatch({ type: GET_EMPLOYMENT_SUGGESTIONS, data: res.data })
    );
}

export function clearEmploymentSuggestions() {
  return dispatch => dispatch({ type: CLEAR_EMPLOYMENT_SUGGESTIONS });
}

export function initEmploymentForm(formName, id) {
  return dispatch => {
    fetchingAction(dispatch,
      apiGetEmploymentById(id)
        .then(res =>
          apiGetSpecialities({ id: res.specialityId })
            .then(spec => {
              const speciality = (spec.data[0] && spec.data[0].name) || '';
              const result = { ...res, speciality };
              dispatch(initialize(formName, result));
            })
        )
    );
  };
}

export function getSpecialitiesSuggestion(params) {
  return dispatch => apiGetSpecialities(params)
    .then(res =>
      dispatch({ type: GET_SPECIALITIES_SUGGESTIONS, data: res.data })
    );
}

export function clearSpecialitiesSuggestion() {
  return dispatch => dispatch({ type: CLEAR_SPECIALITIES_SUGGESTIONS });
}
