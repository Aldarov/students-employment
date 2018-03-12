import {
  SET_ORGANIZATION_LIST,
  SET_ORGANIZATION_LIST_SORTING,
  DELETE_ORGANIZATION,

  SET_ORGANIZATION_SUGGESTIONS,
  CLEAR_ORGANIZATION_SUGGESTIONS
} from '../../constants';
import {
  apiGetOrganizations, apiDeleteOrganization
} from './organizationList.api';
import { fetching } from '../busyIndicator';

export function getOrganizationList(params, formName) {
  return dispatch => fetching(dispatch, formName,
    apiGetOrganizations(params).then(res => {
      dispatch({ type: SET_ORGANIZATION_LIST, data: res });
      if (params.sorting)
        dispatch({ type: SET_ORGANIZATION_LIST_SORTING, data: params.sorting });
      return res;
    })
  );
}

export function deleteOrganization(id, formName) {
  return dispatch => fetching(dispatch, formName,
    apiDeleteOrganization(id).then(() => {
      dispatch({ type: DELETE_ORGANIZATION, data: id });
    })
  );
}

export function getOrganizationSuggestions(params, formName) {
  return dispatch => fetching(dispatch, formName,
    apiGetOrganizations(params).then(res => {
      dispatch({ type: SET_ORGANIZATION_SUGGESTIONS, data: res.data });
      return res;
    })
  );
}

export function clearOrganizationSuggestions() {
  return dispatch => dispatch({ type: CLEAR_ORGANIZATION_SUGGESTIONS });
}
