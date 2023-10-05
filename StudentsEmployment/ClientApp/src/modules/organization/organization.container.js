import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import {
  reduxForm, getFormValues, isPristine, isSubmitting
} from 'redux-form';

import Organization from './Organization';
import actions from './actions';
import withParams from '../_global/hoc/withParams';
import withRouter from '../_global/hoc/withRouter';


const formName = 'organization';
const getId = (props) => props.params.id === 'add' ? null : props.params.id;

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
    onCancel,
    onSaveYes, onSaveNo,
    onLoadData,
    onSubmit,
    ...rest
  } = actions;

  return bindActionCreators({
    onCancel: onCancel(props.navigate),
    onSaveYes: onSaveYes(props.navigate),
    onSaveNo: onSaveNo(props.navigate),
    onLoadData: onLoadData(id),
    onSubmit: onSubmit(props.navigate),
    ...rest
  }, dispatch);
};

export default compose(
  withRouter,
  withParams,
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({form: formName})
)(Organization);

export {
  formName
};
