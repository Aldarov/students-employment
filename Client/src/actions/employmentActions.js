import { fetchingAction } from './';
import { apiGetEmploymentList, apiGetEmploymentById, apiGetSpecialities, apiGetSchools, apiGetOrganizations } from '../api';
import { initialize } from 'redux-form';

export const SET_EMPLOYMENT_LIST = 'SET_EMPLOYMENT_LIST';
export const SET_EMPLOYMENT_SUGGESTIONS = 'SET_EMPLOYMENT_SUGGESTIONS';
export const CLEAR_EMPLOYMENT_SUGGESTIONS = 'CLEAR_EMPLOYMENT_SUGGESTIONS';
export const SET_EMPLOYMENT_LIST_SORTING = 'SET_EMPLOYMENT_LIST_SORTING';
export const SET_SPECIALITIES_SUGGESTIONS = 'SET_SPECIALITIES_SUGGESTIONS';
export const CLEAR_SPECIALITIES_SUGGESTIONS = 'CLEAR_SPECIALITIES_SUGGESTIONS';
export const SET_EMPLOYMENT_CONTRACT = 'SET_EMPLOYMENT_CONTRACT';
export const SET_SCHOOLS_SUGGESTIONS = 'SET_SCHOOLS_SUGGESTIONS';
export const CLEAR_SCHOOLS_SUGGESTIONS = 'CLEAR_SCHOOLS_SUGGESTIONS';
export const SET_ORGANIZATIONS_SUGGESTIONS = 'SET_ORGANIZATIONS_SUGGESTIONS';
export const CLEAR_ORGANIZATIONS_SUGGESTIONS = 'CLEAR_ORGANIZATIONS_SUGGESTIONS';

export function getEmploymentList(params) {
  return dispatch => fetchingAction(dispatch,
    apiGetEmploymentList(params)
      .then(res => {
        dispatch({ type: SET_EMPLOYMENT_LIST, data: res });
        if (params.sorting)
          dispatch({ type: SET_EMPLOYMENT_LIST_SORTING, data: params.sorting });
      })
  );
}

export function getEmploymentSuggestions(params) {
  return dispatch => apiGetEmploymentList(params)
    .then(res =>
      dispatch({ type: SET_EMPLOYMENT_SUGGESTIONS, data: res.data })
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
      dispatch({ type: SET_SPECIALITIES_SUGGESTIONS, data: res.data })
    );
}

export function clearSpecialitiesSuggestion() {
  return dispatch => dispatch({ type: CLEAR_SPECIALITIES_SUGGESTIONS });
}

export function openEmploymentContract(title, tableRow, ) {
  return dispatch => dispatch({ type: SET_EMPLOYMENT_CONTRACT, data: { title, tableRow, opened: true } });
}

export function closeEmploymentContract() {
  return dispatch => dispatch({ type: SET_EMPLOYMENT_CONTRACT, data: { title: '', tableRow: null, opened: false } });
}

export function getSchoolsSuggestion(params) {
  return dispatch => apiGetSchools(params)
    .then(res =>
      dispatch({ type: SET_SCHOOLS_SUGGESTIONS, data: res.data })
    );
}

export function clearSchoolsSuggestion() {
  return dispatch => dispatch({ type: CLEAR_SCHOOLS_SUGGESTIONS });
}

export function getOrganizationsSuggestion(params) {
  return dispatch => apiGetOrganizations(params)
    .then(res =>
      dispatch({ type: SET_ORGANIZATIONS_SUGGESTIONS, data: res.data })
    );
}

export function clearOrganizationsSuggestion() {
  return dispatch => dispatch({ type: CLEAR_ORGANIZATIONS_SUGGESTIONS });
}
