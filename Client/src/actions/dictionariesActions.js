export const GET_SPECIALITIES_SUGGESTIONS = 'GET_SPECIALITIES_SUGGESTIONS';
export const CLEAR_SPECIALITIES_SUGGESTIONS = 'CLEAR_SPECIALITIES_SUGGESTIONS';

import { commonAction } from './commonActions';
import api from '../api';

export function getSpecialitiesSuggestion(params) {
  return dispatch =>
    commonAction(dispatch, api.apiGetSpecialities(params),
      res => dispatch({ type: GET_SPECIALITIES_SUGGESTIONS, data: res.data })
    );
}

export function clearSpecialitiesSuggestion() {
  return dispatch => dispatch({ type: CLEAR_SPECIALITIES_SUGGESTIONS });
}
