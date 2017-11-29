import { connectAdvanced } from 'react-redux';
import { withRouter } from 'react-router';
import { submit, reset, isPristine, isSubmitting } from 'redux-form';

import AuthHOC from './AuthHOC';
import Main from '../components/Main';
import {
  getEduForms, getDirectionTypes, getDistributionTypes,
  openLeftColumn, closeLeftColumn, openQuestionDialog, closeQuestionDialog,
} from '../actions';

const DIALOG_TYPE_RETURN_FROM_EMPLOYMENT = 'DIALOG_TYPE_RETURN_FROM_EMPLOYMENT';

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
      submitting,
      dialog: state.dialog
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
      // onOpenLeftColumn: () => dispatch(openLeftColumn()),
      onCloseLeftColumn: () => dispatch(closeLeftColumn()),
      onSave: () => currentForm && dispatch(submit(currentForm)),
      onReturn: () => {
        if (!pristine) {
          dispatch(openQuestionDialog(true, 'Сохранить изменные данные?', DIALOG_TYPE_RETURN_FROM_EMPLOYMENT));
        } else {
          ownProps.history.push('/employment');
        }
      },
      onDialogYes: () => {
        if (state.dialog.dialogType === DIALOG_TYPE_RETURN_FROM_EMPLOYMENT) {
          currentForm && dispatch(submit(currentForm));
          dispatch(closeQuestionDialog());
          // ownProps.history.push('/employment');
        }
      },
      onDialogNo: () => {
        if (state.dialog.dialogType === DIALOG_TYPE_RETURN_FROM_EMPLOYMENT) {
          currentForm && dispatch(reset(currentForm));
          dispatch(closeQuestionDialog());
          ownProps.history.push('/employment');
        }
      }
    };

    return { ...props, ...methods, ...ownProps };
  })(Main)
));

