import { connectAdvanced } from 'react-redux';
import { withRouter } from 'react-router';

import AuthHOC from './AuthHOC';
import Main from '../components/Main';
import {
  getEduForms, getDirectionTypes, getDistributionTypes, closeLeftColumn,
} from '../actions';

const DIALOG_TYPE_RETURN_FROM_EMPLOYMENT = 'DIALOG_TYPE_RETURN_FROM_EMPLOYMENT';

export default AuthHOC(withRouter(
  connectAdvanced(dispatch => (state, ownProps) => {
    const props = {
      openColumn: state.header.openColumn,
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
      onCloseLeftColumn: () => dispatch(closeLeftColumn()),
      // onReturn: () => {
      //   if (!pristine) {
      //     dispatch(openQuestionDialog(true, 'Сохранить изменные данные?', DIALOG_TYPE_RETURN_FROM_EMPLOYMENT));
      //   } else {
      //     ownProps.history.push('/employment');
      //   }
      // },
      // onDialogYes: () => {
      //   if (state.dialog.dialogType === DIALOG_TYPE_RETURN_FROM_EMPLOYMENT) {
      //     currentForm && dispatch(submit(currentForm));
      //     dispatch(closeQuestionDialog());
      //     // ownProps.history.push('/employment');
      //   }
      // },
      // onDialogNo: () => {
      //   if (state.dialog.dialogType === DIALOG_TYPE_RETURN_FROM_EMPLOYMENT) {
      //     currentForm && dispatch(reset(currentForm));
      //     dispatch(closeQuestionDialog());
      //     ownProps.history.push('/employment');
      //   }
      // }
    };

    return { ...props, ...methods, ...ownProps };
  })(Main)
));

