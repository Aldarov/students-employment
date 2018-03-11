import { initialize } from 'redux-form';

import {
  SET_COUNRIES_SUGGESTIONS,
  CLEAR_COUNRIES_SUGGESTIONS,
  SET_ADDRESSES_SUGGESTIONS,
  CLEAR_ADDRESSES_SUGGESTIONS
} from '../../constants';
import {
  apiGetOrganizationById,
  apiSearchAddress,
  apiGetCountries,
  apiGetAddresses,
  apiPostOrganization
} from './organization.api';
import { fetching } from '../busyIndicator';

export function initOrganizationForm(formName, id) {
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
    } else {
      fetching(dispatch, formName,
        apiGetOrganizationById(id).then(res => apiSearchAddress({
          regionId: res.registrationRegionId, districtId: res.registrationDistrictId,
          cityId: res.registrationCityId, settlementId: res.registrationSettlementId
        }).then(address => {
          const addr = (address && address.name) || '';
          const country = (res.country && res.country.name) || '';
          const result = { ...res, address: addr, countryName: country };
          dispatch(initialize(formName, result));
        }))
      );
    }
  };
}

export function getCountriesSuggestion(params, formName) {
  return dispatch => fetching(dispatch, formName, apiGetCountries(params)
    .then(res =>
      dispatch({ type: SET_COUNRIES_SUGGESTIONS, data: res.data })
    )
  );
}

export function clearCountriesSuggestion() {
  return dispatch => dispatch({ type: CLEAR_COUNRIES_SUGGESTIONS });
}

export function getAddressesSuggestion(params, formName) {
  return dispatch => fetching(dispatch, formName, apiGetAddresses(params)
    .then(res =>
      dispatch({ type: SET_ADDRESSES_SUGGESTIONS, data: res.data })
    )
  );
}

export function clearAddressesSuggestion() {
  return dispatch => dispatch({ type: CLEAR_ADDRESSES_SUGGESTIONS });
}

export function saveOrganization(data, formName, callback) {
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
    fetching(dispatch, formName, apiPostOrganization(res).then(data => callback(data)));
  };
}
