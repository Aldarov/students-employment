import {
  SET_EDU_FORMS,
  SET_DIRECTION_TYPES,
  SET_DISTRIBUTION_TYPES,
  SET_PROFILES,
  CLEAR_PROFILES
} from '../../constants';

import {
  apiGetEduForms,
  apiGetPgTypes,
  apiGetProfiles
} from './dictionaries.api';

export function getEduForms(params) {
  return dispatch => apiGetEduForms(params)
    .then(res =>
      dispatch({ type: SET_EDU_FORMS, data: res })
    );
}

export function getDirectionTypes() {
  return dispatch => apiGetPgTypes(1)
    .then(res =>
      dispatch({ type: SET_DIRECTION_TYPES, data: res })
    );
}

export function getDistributionTypes() {
  return dispatch => apiGetPgTypes(2)
    .then(res =>
      dispatch({ type: SET_DISTRIBUTION_TYPES, data: res })
    );
}

export function getProfiles(specialityId, args) {
  return dispatch => apiGetProfiles(specialityId, args)
    .then(res => {
      dispatch({ type: SET_PROFILES, data: res });
      return res;
    });
}

export function clearProfiles() {
  return dispatch => dispatch({ type: CLEAR_PROFILES });
}
