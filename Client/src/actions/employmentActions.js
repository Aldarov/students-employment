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

// const getStudents = (pgContractStuffs) => {
//   return pgContractStuffs ? pgContractStuffs.map(function(item) {
//     return {
//       fullName: item.student.fullName,
//       regAddress: item.student.regAddress,
//       finance: item.student.finance,
//       entrType: item.student.entrType,
//       phone: item.student.phone,
//       direction: {
//         pgContractStuffsId: item.id,
//         directionTypeId: item.directionType && item.directionType.id,
//         directionOrganizationId: item.directionOrganization && item.directionOrganization.id,
//         directionSchoolId: item.directionSchool && item.directionSchool.id,
//         text: (
//           item.directionType.name +
//           (item.directionOrganization ? ', ' + item.directionOrganization.name : '') +
//           (item.directionSchool ? ', ' + item.directionSchool.name : '')
//         ) || ''
//       },
//       distribution: {
//         pgContractStuffsId: item.id,
//         distributionTypeId: item.distributionType && item.distributionType.id,
//         distributionOrganizationId: item.distributionOrganization && item.distributionOrganization.id,
//         distributionSchoolId: item.distributionSchool && item.distributionSchool.id,
//         jobOnSpeciality: item.jobOnSpeciality,
//         text: (
//           item.distributionType.name +
//           (item.distributionOrganization ? ', ' + item.distributionOrganization.name : '') +
//           (item.distributionSchool ? ', ' + item.distributionSchool.name : '')
//         ) || ''
//       }
//     };
//   }) : [];
// };

export function getEmploymentById(id) {
  return dispatch =>
    commonAction(dispatch, apiGetEmploymentById(id),
      res => {
        commonAction(dispatch, apiGetSpecialities({ id: res.data.specialityId }),
          spec => {
            let result = res.data;
            const speciality = (spec.data.data[0] && spec.data.data[0].name) || '';
            result = { ...result, speciality };
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
