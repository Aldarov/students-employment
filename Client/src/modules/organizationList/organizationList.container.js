import { connectAdvanced } from 'react-redux';

import OrganizationList from './OrganizationList';
import { openSidebar } from '../sidebar';
import { fetchingStart, fetchingEnd } from '../busyIndicator';
import { openQuestionDialog, closeQuestionDialog } from '../dialogs';
import {

} from './organizationList.actions';

const formName = 'organizationList';
const DELETE_ORGANIZATION_DIALOG = 'DELETE_ORGANIZATION_DIALOG';

export default connectAdvanced( dispatch => (state, ownProps) => {
  const props = {
    formName: formName,
    headerProps: {
      onLeftButtonClick: () => dispatch(openSidebar()),
      leftButtonIconName: 'Menu',
      title: 'Организации'
    },

    data: state.organization.list.data,
    searchSuggestions: state.organization.list.searchSuggestions,

    deleteOrganizationDialogProps: {
      contentText: 'Удалить данную запись?',
      onYes: (args) => {
        // dispatch(deleteOrganization(args.row.id));
        dispatch(closeQuestionDialog());
      },
      onNo: () => {
        dispatch(closeQuestionDialog());
      }
    },
  };

  const methods = {

  };

  return { ...props, ...methods, ...ownProps };
})(OrganizationList);
