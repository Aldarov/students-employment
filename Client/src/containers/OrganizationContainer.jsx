import { connectAdvanced } from 'react-redux';
import {
  SubmissionError, reduxForm, getFormValues,
  submit, isPristine, isSubmitting, change, arrayRemove, arrayPush,
  stopAsyncValidation, touch,
} from 'redux-form';

import { Organization } from '../components/organization';
import {
  openQuestionDialog, closeQuestionDialog,
  saveOrganization, initOrganizationForm,
  getCountriesSuggestion, clearCountriesSuggestion,
  getAddressesSuggestion, clearAddressesSuggestion
} from '../actions';

const formName = 'organization';
let onRedirectToList;

const initHeader = (dispatch, ownProps, pristine, submitting, title) => {
  ownProps.onInitHeader({
    onLeftButtonClick: () => {
      if (!pristine) {
        ownProps.onInitDialog({
          contentText: 'Сохранить измененные данные?',
          onYes: () => {
            onRedirectToList = () => {
              ownProps.history.push('/organization');
              onRedirectToList = null;
            };
            dispatch(closeQuestionDialog());
            dispatch(submit(formName));
          },
          onNo: () => {
            dispatch(closeQuestionDialog());
            ownProps.history.push('/organization');
          }
        });
        dispatch(openQuestionDialog());
      } else {
        ownProps.history.push('/organization');
      }
    },
    leftButtonIconName: 'ArrowBack',
    onRightButtonClick: () => dispatch(submit(formName)),
    rightButtonDisabled: pristine || submitting,
    title: title
  });
};

const clearAddress = dispatch => {
  dispatch(change(formName, 'registrationRegionId', null));
  dispatch(change(formName, 'registrationDistrictId', null));
  dispatch(change(formName, 'registrationCityId', null));
  dispatch(change(formName, 'registrationSettlementId', null));
  dispatch(change(formName, 'address', ''));
};

export default connectAdvanced( dispatch => (state, ownProps) => {
  const id  = ownProps.match.params.id === 'add' ? null : ownProps.match.params.id;
  const formValues = getFormValues(formName)(state);
  const pristine = isPristine(formName)(state);
  const submitting = isSubmitting(formName)(state);
  const title = id ? 'Организация' : 'Организация (добавление)';


  const props = {
    loading: state.fetching,
    countriesSuggestions: state.organization.edit.countriesSuggestions,
    addressesSuggestions: state.organization.edit.addressesSuggestions,
    isRussia: formValues && formValues.registrationCountryId == 643 ? true : false
  };

  const methods = {
    onLoadData: () => {
      dispatch(initOrganizationForm(formName, id,
        () => {
          initHeader(dispatch, ownProps, pristine, submitting, title);
        }
      ));
    },
    onChange: () => {
      initHeader(dispatch, ownProps, pristine, submitting, title);
    },
    onSubmit: values => {
      dispatch(saveOrganization(values, res => {
        if (onRedirectToList) {
          onRedirectToList();
        }
        else {
          initHeader(dispatch, ownProps, pristine, submitting, title);
        }
      }));
      // throw new SubmissionError({
      //   entraceYear: 'Ошибка заполнения',
      //   _error: 'Общая ошибка формы!!'
      // });
    },
    validate: values => {},

    onGetCountriesSuggestions: value => dispatch(getCountriesSuggestion({ limit: 7, search: value, sorting: [{columnName: 'name'}] })),
    onClearCountriesSuggestions: () => dispatch(clearCountriesSuggestion()),
    onCountriesSelected: data => {
      dispatch(change(formName, 'registrationCountryId', data.id));
      dispatch(change(formName, 'countryName', data.name));
      if (data.id != 643) {
        clearAddress(dispatch);
      }
    },
    onClearCountriesSelectedSuggestion: () => {
      dispatch(change(formName, 'registrationCountryId', null));
      dispatch(change(formName, 'countryName', ''));
      clearAddress(dispatch);
    },

    onGetKladrSuggestions: value => dispatch(getAddressesSuggestion({ limit: 7, search: value, sorting: [{columnName: 'name'}] })),
    onClearKladrSuggestions: () => dispatch(clearAddressesSuggestion()),
    onKladrSelected: data => {
      dispatch(change(formName, 'registrationRegionId', data.regionId));
      dispatch(change(formName, 'registrationDistrictId', data.districtId));
      dispatch(change(formName, 'registrationCityId', data.cityId));
      dispatch(change(formName, 'registrationSettlementId', data.settlementId));
      dispatch(change(formName, 'address', data.name));
    },
    onClearKladrSelectedSuggestion: () => clearAddress(dispatch)
  };

  return { ...props, ...methods, ...ownProps };
})(
  reduxForm({
    form: formName,
  })(Organization)
);
