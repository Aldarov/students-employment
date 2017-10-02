export const LOAD_SPECIALITIES = 'LOAD_SPECIALITIES';

import { commonAction } from './commonActions';
import { apiLoadSpecialities } from '../api';

export function loadSpecialities() {
  return dispatch =>
    commonAction(dispatch, apiLoadSpecialities(),
      res => dispatch({ type: LOAD_SPECIALITIES, data: res.data })
    );
}
