export const GET_EDU_FORMS = 'GET_EDU_FORMS';
export const GET_DIRECTION_TYPES = 'GET_DIRECTION_TYPES';
export const GET_DISTRIBUTION_TYPES = 'GET_DISTRIBUTION_TYPES';

import {
  apiGetEduForms,
  apiGetPgTypes
} from '../api';

export function getEduForms(params) {
  return dispatch => apiGetEduForms(params)
    .then(res =>
      dispatch({ type: GET_EDU_FORMS, data: res })
    );
}

export function getDirectionTypes() {
  return dispatch => apiGetPgTypes(1)
    .then(res =>
      dispatch({ type: GET_DIRECTION_TYPES, data: res })
    );
}

export function getDistributionTypes() {
  return dispatch => apiGetPgTypes(2)
    .then(res =>
      dispatch({ type: GET_DISTRIBUTION_TYPES, data: res })
    );
}
