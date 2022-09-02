import { change } from 'redux-form';

import { fetching } from '../../busyIndicator';
import { formName } from '../organization.container';
import { apiGetCountries } from '../../layout';
import { SET_COUNRIES_SUGGESTIONS, CLEAR_COUNRIES_SUGGESTIONS } from '../../../constants';
import throwError from '../../_global/helpers/throwError';
import { clearAddress } from './kladr.actions';

const onGetCountriesSuggestions = value => async dispatch => {
  const res = await fetching(dispatch, formName, apiGetCountries({ limit: 20, search: value, sorting: [{columnName: 'name'}] }));
  throwError(res);
  dispatch({ type: SET_COUNRIES_SUGGESTIONS, data: res.data });
};

const onClearCountriesSuggestions = () => ({ type: CLEAR_COUNRIES_SUGGESTIONS });

const onCountriesSelected = data => dispatch => {
  dispatch(change(formName, 'registrationCountryId', data.id));
  dispatch(change(formName, 'countryName', data.name));
  if (data.id != 643) dispatch(clearAddress());
};

const onClearCountriesSelectedSuggestion = () => dispatch => {
  dispatch(change(formName, 'registrationCountryId', null));
  dispatch(change(formName, 'countryName', ''));
  dispatch(clearAddress());
};

export {
  onGetCountriesSuggestions,
  onClearCountriesSuggestions,
  onCountriesSelected,
  onClearCountriesSelectedSuggestion
};
