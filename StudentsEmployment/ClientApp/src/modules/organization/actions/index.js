import {
  initialize,
  change,
  getFormValues,
  touch,
  isPristine
} from 'redux-form';
import isEmpty from 'lodash/isEmpty';

import {
  onGetCountriesSuggestions,
  onClearCountriesSuggestions,
  onCountriesSelected,
  onClearCountriesSelectedSuggestion
} from './country.actions';
import {
  onGetKladrSuggestions,
  onClearKladrSuggestions,
  onKladrSelected,
  onClearKladrSelectedSuggestion
} from './kladr.actions';
import { openQuestionDialog, closeQuestionDialog } from '../../dialogs';
import { formName } from '../organization.container';
import { fetching } from '../../busyIndicator';
import { apiGetOrganizationById, apiPostOrganization } from '../organization.api';
import { apiSearchAddress } from '../../layout';
import throwError from '../../_global/helpers/throwError';


const CONFIRM_SAVE_ORGANIZATION_DIALOG = 'CONFIRM_SAVE_ORGANIZATION_DIALOG';

const onLoadData = (id) => () => async dispatch => {
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
    const res = await fetching(dispatch, formName, apiGetOrganizationById(id));
    throwError(res);

    const address = await fetching(dispatch, formName, apiSearchAddress({
      regionId: res.registrationRegionId, districtId: res.registrationDistrictId,
      cityId: res.registrationCityId, settlementId: res.registrationSettlementId
    }));
    throwError(address);

    const addr = (address && address.name) || '';
    const country = (res.country && res.country.name) || '';
    const result = { ...res, address: addr, countryName: country };
    dispatch(initialize(formName, result));
  }
};

const onSubmit = (navigate, redirectToList) => values => async (dispatch) => {
  const org = {
    ...values,
    country: null,
    countryName: null,
    registrationRegion: null,
    registrationDistrict: null,
    registrationCity: null,
    registrationSettlement: null,
    address: null
  };
  const res = await fetching(dispatch, formName, apiPostOrganization(org));
  throwError(res);

  if (redirectToList) {
    navigate('/organization');
  } else {
    dispatch(initialize(formName, values));
    dispatch(change(formName, 'id', res.id));
    navigate(`/organization/${res.id}`);
  }
  return res;
};

const validate = values => () => {
  const errors = {};

  const requiredFields = ['name'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Заполните данное поле';
    }
  });

  return errors;
};


const onSaveYes = (history) => () => (dispatch, getState) => {
  dispatch(closeQuestionDialog(CONFIRM_SAVE_ORGANIZATION_DIALOG));
  const state = getState();
  const values = getFormValues(formName)(state);
  const errors = dispatch(validate(values));
  if (isEmpty(errors)) {
    dispatch(onSubmit(history, true)(values));
  } else {
    for (var err in errors) {
      dispatch(touch(formName, err));
    }
  }
};

const onSaveNo = (navigate) => () => (dispatch) => {
  dispatch(closeQuestionDialog(CONFIRM_SAVE_ORGANIZATION_DIALOG));
  navigate('/organization');
};

const onCancel = (navigate) => () => (dispatch, getState) => {
  const state = getState();
  const pristine = isPristine(formName)(state);

  if (!pristine) {
    dispatch(openQuestionDialog(CONFIRM_SAVE_ORGANIZATION_DIALOG));
  } else {
    navigate('/organization');
  }
}

export default {
  onCancel,
  onSaveYes,
  onSaveNo,
  onLoadData,
  onSubmit,
  validate,

  onGetCountriesSuggestions,
  onClearCountriesSuggestions,
  onCountriesSelected,
  onClearCountriesSelectedSuggestion,

  onGetKladrSuggestions,
  onClearKladrSuggestions,
  onKladrSelected,
  onClearKladrSelectedSuggestion
};

export {
  CONFIRM_SAVE_ORGANIZATION_DIALOG
};
