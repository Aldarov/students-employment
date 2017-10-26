import { commonAction } from './commonActions';

export const GET_EDU_FORMS = 'GET_EDU_FORMS';
export const GET_DIRECTION_TYPES = 'GET_DIRECTION_TYPES';
export const GET_DISTRIBUTION_TYPES = 'GET_DISTRIBUTION_TYPES';

import {
  apiGetEduForms,
  apiGetPgTypes
} from '../api';

export function getEduForms(params) {
  return dispatch =>
    commonAction(dispatch, apiGetEduForms(params),
      res => dispatch({ type: GET_EDU_FORMS, data: res.data })
    );
}

export function getDirectionTypes() {
  return dispatch =>
    commonAction(dispatch, apiGetPgTypes(1),
      res => dispatch({ type: GET_DIRECTION_TYPES, data: res.data })
    );
}

export function getDistributionTypes() {
  return dispatch =>
    commonAction(dispatch, apiGetPgTypes(2),
      res => dispatch({ type: GET_DISTRIBUTION_TYPES, data: res.data })
    );
}
