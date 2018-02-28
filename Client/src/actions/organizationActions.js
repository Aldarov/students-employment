import { fetchingAction } from './';
import {
  apiGetOrganizations, apiDeleteOrganization,
  apiGetOrganizationById, apiGetCountries,
  apiGetAddresses, apiSearchAddress,
  apiPostOrganization
} from '../api';
import { initialize } from 'redux-form';

export const SET_ORGANIZATION_LIST = 'SET_ORGANIZATION_LIST';
export const SET_ORGANIZATION_LIST_SORTING = 'SET_ORGANIZATION_LIST_SORTING';
export const SET_ORGANIZATION_SUGGESTIONS = 'SET_ORGANIZATION_SUGGESTIONS';
export const CLEAR_ORGANIZATION_SUGGESTIONS = 'CLEAR_ORGANIZATION_SUGGESTIONS';
export const DELETE_ORGANIZATION = 'DELETE_ORGANIZATION';
export const SET_COUNRIES_SUGGESTIONS = 'SET_COUNRIES_SUGGESTIONS';
export const CLEAR_COUNRIES_SUGGESTIONS = 'CLEAR_COUNRIES_SUGGESTIONS';
export const SET_ADDRESSES_SUGGESTIONS = 'SET_ADDRESSES_SUGGESTIONS';
export const CLEAR_ADDRESSES_SUGGESTIONS = 'CLEAR_ADDRESSES_SUGGESTIONS';

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

export function initOrganizationForm(formName, id, callback) {
  return dispatch => {
    if (!id) {
      dispatch(initialize(formName, {
        name: '',
        registrationCountryId: null,
        registrationRegionId: null,
        registrationDistrictId: null,
        registrationCityId: null,
        registrationSettlementId: null,
        country: {
          name: ''
        },
        registrationRegion: {
          name: ''
        },
        registrationDistrict: {
          name: ''
        },
        registrationCity: {
          name: ''
        },
        'registrationSettlement': {
          name: ''
        },
        address: '',
        countryName: ''
      }));
      if (typeof callback === 'function') callback();
    } else {
      fetchingAction(dispatch, apiGetOrganizationById(id)
        .then(res => {
          return apiSearchAddress({
            regionId: res.registrationRegionId, districtId: res.registrationDistrictId,
            cityId: res.registrationCityId, settlementId: res.registrationSettlementId
          }).then(address => {
            const addr = (address && address.name) || '';
            const country = (res.country && res.country.name) || '';
            const result = { ...res, address: addr, countryName: country };
            dispatch(initialize(formName, result));
            if (typeof callback === 'function') callback();
          });
        })
      );
    }
  };
}

export function getCountriesSuggestion(params) {
  return dispatch => apiGetCountries(params)
    .then(res =>
      dispatch({ type: SET_COUNRIES_SUGGESTIONS, data: res.data })
    );
}

export function clearCountriesSuggestion() {
  return dispatch => dispatch({ type: CLEAR_COUNRIES_SUGGESTIONS });
}

export function getAddressesSuggestion(params) {
  return dispatch => apiGetAddresses(params)
    .then(res =>
      dispatch({ type: SET_ADDRESSES_SUGGESTIONS, data: res.data })
    );
}

export function clearAddressesSuggestion() {
  return dispatch => dispatch({ type: CLEAR_ADDRESSES_SUGGESTIONS });
}

export function saveOrganization(data, callback) {
  return dispatch => {
    const res = {
      ...data,
      country: null,
      countryName: null,
      registrationRegion: null,
      registrationDistrict: null,
      registrationCity: null,
      registrationSettlement: null,
      address: null
    };
    fetchingAction(dispatch, apiPostOrganization(res).then(data => callback(data)));
  };
}
