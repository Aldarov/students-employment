import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  reduxForm, getFormValues, isPristine, isSubmitting
} from 'redux-form';

import Organization from './Organization';
import actions from './actions';


const formName = 'organization';
const getId = (props) => props.match.params.id === 'add' ? null : props.match.params.id;

const mapStateToProps = (state, props) => {
  let id  = getId(props);
  const formValues = getFormValues(formName)(state);
  const pristine = isPristine(formName)(state);
  const submitting = isSubmitting(formName)(state);

  return {
    formName: formName,
    headerProps: {
      leftButtonIconName: 'ArrowBack',
      rightButtonDisabled: pristine || submitting,
      title: id ? 'Организация' : 'Организация (добавление)'
    },
    countriesSuggestions: state.organization.edit.countriesSuggestions,
    addressesSuggestions: state.organization.edit.addressesSuggestions,
    isRussia: formValues && formValues.registrationCountryId == 643 ? true : false
  };
};

const mapDispatchToProps = (dispatch, props) => {
  let id  = getId(props);
  const {
    onHeaderLeftButtonClick,
    onSaveYes, onSaveNo,
    onLoadData,
    onSubmit,
    ...rest
  } = actions;

  return bindActionCreators({
    onHeaderLeftButtonClick: onHeaderLeftButtonClick(props.history),
    onSaveYes: onSaveYes(props.history),
    onSaveNo: onSaveNo(props.history),
    onLoadData: onLoadData(id),
    onSubmit: onSubmit(props.history),
    ...rest
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: formName,
  })(Organization)
);

export {
  formName
};
