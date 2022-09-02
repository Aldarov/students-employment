import { change } from 'redux-form';

import { formName } from '../organization.container';
import { apiGetAddresses } from '../../layout';
import { fetching } from '../../busyIndicator';
import { SET_ADDRESSES_SUGGESTIONS, CLEAR_ADDRESSES_SUGGESTIONS } from '../../../constants';
import throwError from '../../_global/helpers/throwError';

export function getAddressesSuggestion(params, formName) {
  return dispatch => fetching(dispatch, formName, apiGetAddresses(params)
    .then(res =>
      dispatch({ type: SET_ADDRESSES_SUGGESTIONS, data: res.data })
    )
  );
}

const clearAddress = () => dispatch => {
  dispatch(change(formName, 'registrationRegionId', null));
  dispatch(change(formName, 'registrationDistrictId', null));
  dispatch(change(formName, 'registrationCityId', null));
  dispatch(change(formName, 'registrationSettlementId', null));
  dispatch(change(formName, 'address', ''));
};

const onGetKladrSuggestions = value => async dispatch => {
  const res = await fetching(dispatch, formName, apiGetAddresses({ limit: 20, search: value, sorting: [{columnName: 'name'}] }));
  throwError(res);
  dispatch({ type: SET_ADDRESSES_SUGGESTIONS, data: res.data });
};

const onClearKladrSuggestions = () => ({ type: CLEAR_ADDRESSES_SUGGESTIONS });

const onKladrSelected = data => dispatch => {
  dispatch(change(formName, 'registrationRegionId', data.regionId));
  dispatch(change(formName, 'registrationDistrictId', data.districtId));
  dispatch(change(formName, 'registrationCityId', data.cityId));
  dispatch(change(formName, 'registrationSettlementId', data.settlementId));
  dispatch(change(formName, 'address', data.name));
};

const onClearKladrSelectedSuggestion = () => clearAddress();

export {
  onGetKladrSuggestions,
  onClearKladrSuggestions,
  onKladrSelected,
  onClearKladrSelectedSuggestion,
  clearAddress
};
