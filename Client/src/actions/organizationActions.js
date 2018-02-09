import { fetchingAction } from './';
import {
  apiGetOrganizations, apiDeleteOrganization
} from '../api';

export const SET_ORGANIZATION_LIST = 'SET_ORGANIZATION_LIST';
export const SET_ORGANIZATION_LIST_SORTING = 'SET_ORGANIZATION_LIST_SORTING';
export const SET_ORGANIZATION_SUGGESTIONS = 'SET_ORGANIZATION_SUGGESTIONS';
export const CLEAR_ORGANIZATION_SUGGESTIONS = 'CLEAR_ORGANIZATION_SUGGESTIONS';
export const DELETE_ORGANIZATION = 'DELETE_ORGANIZATION';

export function getOrganizationList(params) {
  return dispatch => fetchingAction(dispatch,
    apiGetOrganizations(params)
      .then(res => {
        dispatch({ type: SET_ORGANIZATION_LIST, data: res });
        if (params.sorting)
          dispatch({ type: SET_ORGANIZATION_LIST_SORTING, data: params.sorting });
      })
  );
}

export function getOrganizationSuggestions(params) {
  return dispatch => apiGetOrganizations(params)
    .then(res =>
      dispatch({ type: SET_ORGANIZATION_SUGGESTIONS, data: res.data })
    );
}

export function clearOrganizationSuggestions() {
  return dispatch => dispatch({ type: CLEAR_ORGANIZATION_SUGGESTIONS });
}

export function deleteOrganization(id, callback) {
  return dispatch => {
    fetchingAction(dispatch, apiDeleteOrganization(id)
      .then(() => {
        dispatch({ type: DELETE_ORGANIZATION, data: id });
        callback();
      }));
  };
}
