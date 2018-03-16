import {
  SET_EDU_FORMS,
  SET_DIRECTION_TYPES,
  SET_DISTRIBUTION_TYPES
} from '../../constants';

import {
  apiGetEduForms,
  apiGetPgTypes
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
