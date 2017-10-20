import { apiGetEmploymentList, apiGetEmploymentById, apiGetSpecialities } from '../api';
import { commonAction } from './commonActions';

export const GET_EMPLOYMENT_LIST = 'GET_EMPLOYMENT_LIST';
export const GET_EMPLOYMENT_SUGGESTIONS = 'GET_EMPLOYMENT_SUGGESTIONS';
export const CLEAR_EMPLOYMENT_SUGGESTIONS = 'CLEAR_EMPLOYMENT_SUGGESTIONS';
export const SET_EMPLOYMENT_LIST_SORTING = 'SET_EMPLOYMENT_LIST_SORTING';
export const GET_EMPLOYMENT_BY_ID = 'GET_EMPLOYMENT_BY_ID';
export const GET_SPECIALITIES_SUGGESTIONS = 'GET_SPECIALITIES_SUGGESTIONS';
export const CLEAR_SPECIALITIES_SUGGESTIONS = 'CLEAR_SPECIALITIES_SUGGESTIONS';

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

export function getEmploymentSuggestions(params) {
  return dispatch =>
    commonAction(dispatch, apiGetEmploymentList(params),
      res => dispatch({ type: GET_EMPLOYMENT_SUGGESTIONS, data: res.data.data })
    );
}

export function clearEmploymentSuggestions() {
  return dispatch => dispatch({ type: CLEAR_EMPLOYMENT_SUGGESTIONS });
}

const getStudents = (pgContractStuffs) => {
  return pgContractStuffs.map(function(item) {
    return {
      fullName: item.students.fullName,
      regAddress: item.students.regAddress,
      finance: item.students.finance,
      entrType: item.students.entrType,
      phone: item.students.phone,
      direction: item.directionType.name || '',
      distribution: item.distributionType.name || ''
    };
  });
};

export function getEmploymentById(id) {
  console.log('getEmploymentById', id);
  return dispatch =>
    commonAction(dispatch, apiGetEmploymentById(id),
      res => {
        commonAction(dispatch, apiGetSpecialities({ id: res.data.specialityId }),
          spec => {
            let result = res.data;
            const speciality = (spec.data.data[0] && spec.data.data[0].name) || '';
            console.log('getEmploymentById1', result, speciality);

            // const stud = {students: getStudents(result.pgContractStuffs)};
            // console.log('students: ', stud);

            result = { ...result, speciality };
            console.log('getEmploymentById2', result);

            dispatch({ type: GET_EMPLOYMENT_BY_ID, data: result });
          }
        );

      }
    );
}

export function setEmploymentById(data) {
  return dispatch => dispatch({ type: GET_EMPLOYMENT_BY_ID, data: data });
}

export function getSpecialitiesSuggestion(params) {
  return dispatch =>
    commonAction(dispatch, apiGetSpecialities(params),
      res => dispatch({ type: GET_SPECIALITIES_SUGGESTIONS, data: res.data.data })
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
