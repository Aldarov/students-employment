import { fetchingAction } from './';
import {
  apiGetEmploymentList, apiGetEmploymentById,
  apiGetSpecialities, apiGetSchools, apiGetOrganizations,
  apiPostEmployment, apiDeleteEmployment
} from '../api';
import { initialize } from 'redux-form';

export const SET_EMPLOYMENT_LIST = 'SET_EMPLOYMENT_LIST';
export const SET_EMPLOYMENT_SUGGESTIONS = 'SET_EMPLOYMENT_SUGGESTIONS';
export const CLEAR_EMPLOYMENT_SUGGESTIONS = 'CLEAR_EMPLOYMENT_SUGGESTIONS';
export const SET_EMPLOYMENT_LIST_SORTING = 'SET_EMPLOYMENT_LIST_SORTING';
export const DELETE_EMPLOYMENT = 'DELETE_EMPLOYMENT';

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

export function initEmploymentForm(formName, id, callback) {
  return dispatch => {
    if (!id) {
      dispatch(initialize(formName, {
        specialityId: null,
        entraceYear: null,
        eduFormId: null,
        docDate: null,
        pgContractStuffs: [],
        speciality: ''
      }, false, { keepSubmitSucceeded: true }));
      if (typeof callback === 'function') callback();
    } else {
      fetchingAction(dispatch,
        apiGetEmploymentById(id)
          .then(res =>
            apiGetSpecialities({ id: res.specialityId })
              .then(spec => {
                const speciality = (spec.data[0] && spec.data[0].name) || '';
                const stuff = res.pgContractStuffs.sort(function (a, b) {
                  const fullNameA = a.student.fullName;
                  const fullNameB = b.student.fullName;
                  if (fullNameA > fullNameB) {
                    return 1;
                  }
                  if (fullNameA < fullNameB) {
                    return -1;
                  }
                  return 0;
                });
                res.pgContractStuffs = stuff;
                const result = { ...res, speciality };
                dispatch(initialize(formName, result, false, { keepSubmitSucceeded: true }));
                if (typeof callback === 'function') callback();
              })
          )
      );
    }
  };
}

export function saveEmployment(data, callback) {
  return dispatch => {
    const stuff = data.pgContractStuffs.map(item => {
      return {
        ...item,
        student: null
      };
    });
    const res = {
      ...data,
      pgContractStuffs: stuff
    };
    fetchingAction(dispatch, apiPostEmployment(res).then(data => callback(data)));
  };
}

export function deleteEmployment(id, callback) {
  return dispatch => {
    fetchingAction(dispatch, apiDeleteEmployment(id)
      .then(() => {
        dispatch({ type: DELETE_EMPLOYMENT, data: id });
        callback();
      }));
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

export function openEmploymentContract(title, tableRow,
  showDirectionSchools, showDirectionOrganizations, showDistributionSchools, showDistributionOrganizations ) {
  return dispatch => dispatch({ type: SET_EMPLOYMENT_CONTRACT,
    data: { title, tableRow, opened: true,
      showDirectionSchools, showDirectionOrganizations, showDistributionSchools, showDistributionOrganizations
    }
  });
}

export function closeEmploymentContract() {
  return dispatch => dispatch({ type: SET_EMPLOYMENT_CONTRACT,
    data: { title: '', tableRow: null, opened: false,
      showDirectionSchools: false, showDirectionOrganizations: false, showDistributionSchools: false, showDistributionOrganizations: false
    }
  });
}

export function showDirectionOrganizations(type) {
  return dispatch => {
    let data;
    if (type === 'school') {
      data = { showDirectionSchools: true, showDirectionOrganizations: false };
    } else {
      data = { showDirectionSchools: false, showDirectionOrganizations: true };
    }

    return dispatch({ type: SET_EMPLOYMENT_CONTRACT, data });
  };
}

export function showDistributionOrganizations(type) {
  return dispatch => {
    let data;
    if (type === 'school') {
      data = { showDistributionSchools: true, showDistributionOrganizations: false };
    } else {
      data = { showDistributionSchools: false, showDistributionOrganizations: true };
    }

    return dispatch({ type: SET_EMPLOYMENT_CONTRACT, data });
  };
}

export function hideDirectionOrganizations() {
  return dispatch => dispatch({ type: SET_EMPLOYMENT_CONTRACT,
    data: { showDirectionSchools: false, showDirectionOrganizations: false }
  });
}

export function hideDistributionOrganizations() {
  return dispatch => dispatch({ type: SET_EMPLOYMENT_CONTRACT,
    data: { showDistributionSchools: false, showDistributionOrganizations: false }
  });
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
