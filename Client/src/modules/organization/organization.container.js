import { connectAdvanced } from 'react-redux';
import {
  reduxForm, getFormValues,
  submit, isPristine, isSubmitting, change
} from 'redux-form';

import Organization from './Organization';
import { openQuestionDialog, closeQuestionDialog } from '../dialogs';
import {
  saveOrganization, initOrganizationForm,
  getCountriesSuggestion, clearCountriesSuggestion,
  getAddressesSuggestion, clearAddressesSuggestion
} from './organization.actions';


const formName = 'organization';
const CONFIRM_SAVE_ORGANIZATION_DIALOG = 'CONFIRM_SAVE_ORGANIZATION_DIALOG';
let onRedirectToList;

const clearAddress = dispatch => {
  dispatch(change(formName, 'registrationRegionId', null));
  dispatch(change(formName, 'registrationDistrictId', null));
  dispatch(change(formName, 'registrationCityId', null));
  dispatch(change(formName, 'registrationSettlementId', null));
  dispatch(change(formName, 'address', ''));
};

export default connectAdvanced( dispatch => (state, ownProps) => {
  let id  = ownProps.match.params.id === 'add' ? null : ownProps.match.params.id;
  const formValues = getFormValues(formName)(state);
  const pristine = isPristine(formName)(state);
  const submitting = isSubmitting(formName)(state);

  const props = {
    formName: formName,
    headerProps: {
      onLeftButtonClick: () => {
        if (!pristine) {
          dispatch(openQuestionDialog(CONFIRM_SAVE_ORGANIZATION_DIALOG));
        } else {
          ownProps.history.push('/organization');
        }
      },
      leftButtonIconName: 'ArrowBack',
      onRightButtonClick: () => dispatch(submit(formName)),
      rightButtonDisabled: pristine || submitting,
      title: id ? 'Организация' : 'Организация (добавление)'
    },
    countriesSuggestions: state.organization.edit.countriesSuggestions,
    addressesSuggestions: state.organization.edit.addressesSuggestions,
    isRussia: formValues && formValues.registrationCountryId == 643 ? true : false,

    confirmSaveOrganizationDailogProps: {
      dialogName: CONFIRM_SAVE_ORGANIZATION_DIALOG,
      contentText: 'Сохранить измененные данные?',
      onYes: () => {
        onRedirectToList = () => {
          ownProps.history.push('/organization');
          onRedirectToList = null;
        };
        dispatch(closeQuestionDialog(CONFIRM_SAVE_ORGANIZATION_DIALOG));
        dispatch(submit(formName));
      },
      onNo: () => {
        dispatch(closeQuestionDialog(CONFIRM_SAVE_ORGANIZATION_DIALOG));
        ownProps.history.push('/organization');
      }
    }
  };

  const methods = {
    onLoadData: () => {
      dispatch(initOrganizationForm(formName, id, formName));
    },
    onSubmit: values => {
      dispatch(saveOrganization(values, formName, res => {
        if (onRedirectToList) {
          onRedirectToList();
        }
        else {
          ownProps.history.push(`/organization/${res.id}`);
        }
      }));
      // throw new SubmissionError({
      //   entraceYear: 'Ошибка заполнения',
      //   _error: 'Общая ошибка формы!!'
      // });
    },
    validate: values => {
      const errors = {};

      const requiredFields = ['name'];
      requiredFields.forEach(field => {
        if (!values[field]) {
          errors[field] = 'Заполните данное поле';
        }
      });

      return errors;
    },

    onGetCountriesSuggestions: value => dispatch(getCountriesSuggestion({ limit: 20, search: value, sorting: [{columnName: 'name'}] }, formName)),
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

    onGetKladrSuggestions: value => dispatch(getAddressesSuggestion({ limit: 20, search: value, sorting: [{columnName: 'name'}] }, formName)),
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
