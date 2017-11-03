import { apiGetEmploymentList, apiGetEmploymentById, apiGetSpecialities } from '../api';
import { fetchingAction } from './fetchingActions';

export const GET_EMPLOYMENT_LIST = 'GET_EMPLOYMENT_LIST';
export const GET_EMPLOYMENT_SUGGESTIONS = 'GET_EMPLOYMENT_SUGGESTIONS';
export const CLEAR_EMPLOYMENT_SUGGESTIONS = 'CLEAR_EMPLOYMENT_SUGGESTIONS';
export const SET_EMPLOYMENT_LIST_SORTING = 'SET_EMPLOYMENT_LIST_SORTING';
export const GET_EMPLOYMENT_BY_ID = 'GET_EMPLOYMENT_BY_ID';
export const GET_SPECIALITIES_SUGGESTIONS = 'GET_SPECIALITIES_SUGGESTIONS';
export const CLEAR_SPECIALITIES_SUGGESTIONS = 'CLEAR_SPECIALITIES_SUGGESTIONS';

export function getEmploymentList(params) {
  return dispatch => fetchingAction(dispatch,
    apiGetEmploymentList(params).then(res => {
      dispatch({ type: GET_EMPLOYMENT_LIST, data: res.data });
      if (params.sorting)
        dispatch({ type: SET_EMPLOYMENT_LIST_SORTING, data: params.sorting });
    })
  );
}

export function getEmploymentSuggestions(params) {
  return dispatch => apiGetEmploymentList(params).then(res =>
    dispatch({ type: GET_EMPLOYMENT_SUGGESTIONS, data: res.data.data })
  );
}

export function clearEmploymentSuggestions() {
  return dispatch => dispatch({ type: CLEAR_EMPLOYMENT_SUGGESTIONS });
}

export function getEmploymentById(id) {
  return dispatch => fetchingAction(dispatch,
    apiGetEmploymentById(id)
      .then(res =>
        apiGetSpecialities({ id: res.data.specialityId })
          .then(spec => {
            let result = res.data;
            const speciality = (spec.data.data[0] && spec.data.data[0].name) || '';
            result = { ...result, speciality };
            dispatch({ type: GET_EMPLOYMENT_BY_ID, data: result });
          })
      )
  );
}

export function getSpecialitiesSuggestion(params) {
  return dispatch => apiGetSpecialities(params).then(res =>
    dispatch({ type: GET_SPECIALITIES_SUGGESTIONS, data: res.data.data })
  );
}

export function clearSpecialitiesSuggestion() {
  return dispatch => dispatch({ type: CLEAR_SPECIALITIES_SUGGESTIONS });
}

export function clearSpecialitySelectedSuggestion() {
  return dispatch => {
    dispatch({
      type: '@@redux-form/CHANGE',
      meta: {
        form: 'employment',
        field: 'speciality',
        touch: false,
        persistentSubmitErrors: false
      },
      payload: ''
    });
    dispatch({
      type: '@@redux-form/CHANGE',
      meta: {
        form: 'employment',
        field: 'specialityId',
      },
      payload: null
    });
  };
}

export function specialitySelected(data) {
  return dispatch => {
    dispatch({
      type: '@@redux-form/CHANGE',
      meta: {
        form: 'employment',
        field: 'speciality',
        touch: true,
        active: false
      },
      payload: data.name
    });
    dispatch({
      type: '@@redux-form/CHANGE',
      meta: {
        form: 'employment',
        field: 'specialityId',
      },
      payload: data.id
    });
  };
}
