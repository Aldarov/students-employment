import { connectAdvanced } from 'react-redux';
import { withRouter } from 'react-router';
import { submit, reset, isPristine, isSubmitting } from 'redux-form';

import AuthHOC from './AuthHOC';
import Main from '../components/Main';
import {
  getEduForms, getDirectionTypes, getDistributionTypes,
  openLeftColumn, closeLeftColumn,
} from '../actions';

export default AuthHOC(withRouter(
  connectAdvanced(dispatch => (state, ownProps) => {
    const currentForm = state.header.currentForm;
    const pristine = isPristine(currentForm)(state);
    const submitting = isSubmitting(currentForm)(state);

    const props = {
      title: state.header.title,
      openColumn: state.header.openColumn,
      formName: currentForm,
      pristine,
      submitting
    };

    const methods = {
      onRedirectToEmployment: () => {
        ownProps.history.push('/employment');
      },
      onRedirectToOrganization: () => {
        ownProps.history.push('/organization');
      },
      onLoadData: () => {
        dispatch(getEduForms());
        dispatch(getDirectionTypes());
        dispatch(getDistributionTypes());
      },
      onOpenLeftColumn: () => dispatch(openLeftColumn()),
      onCloseLeftColumn: () => dispatch(closeLeftColumn()),
      onSave: () => (currentForm ? () => dispatch(submit(currentForm)) : null),
      onReturn: () => (currentForm ?
        () => {
          dispatch(reset(currentForm));
          ownProps.history.push('/employment');
        } :
        null
      ),
    };

    return { ...props, ...methods, ...ownProps };
  })(Main)
));
