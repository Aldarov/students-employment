import { commonAction } from './commonActions';

export const GET_EDU_FORMS = 'GET_EDU_FORMS';

import {
  apiGetEduForms
} from '../api';

export function getEduForms(params) {
  return dispatch =>
    commonAction(dispatch, apiGetEduForms(params),
      res => dispatch({ type: GET_EDU_FORMS, data: res.data })
    );
}
