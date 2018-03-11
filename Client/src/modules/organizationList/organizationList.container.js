import { connectAdvanced } from 'react-redux';

import OrganizationList from './OrganizationList';
import { openSidebar } from '../sidebar';
import { openQuestionDialog, closeQuestionDialog } from '../dialogs';
import {
  deleteOrganization, getOrganizationList,
  getOrganizationSuggestions, clearOrganizationSuggestions
} from './organizationList.actions';

const formName = 'organizationList';
const DELETE_ORGANIZATION_DIALOG = 'DELETE_ORGANIZATION_DIALOG';

export default connectAdvanced( dispatch => (state, ownProps) => {
  const { limit, page, totalRecord, sorting } = state.organization.list.info;

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
      dialogName: DELETE_ORGANIZATION_DIALOG,
      contentText: 'Удалить данную запись?',
      onYes: (args) => {
        dispatch(deleteOrganization(args.row.id), formName);
        dispatch(closeQuestionDialog(DELETE_ORGANIZATION_DIALOG));
      },
      onNo: () => {
        dispatch(closeQuestionDialog(DELETE_ORGANIZATION_DIALOG));
      }
    },

    gridSetting: {
      columns: [
        { name: 'id', title: 'Код' },
        { name: 'name', title: 'Организация' },
        { name: 'address', title: 'Адрес' },
      ],
      defaultColumnWidths: [
        { columnName: 'id', width: 100 },
        { columnName: 'name', width: 500 },
        { columnName: 'address', width: 500 },
      ],

      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,

      allowSorting: true,
      sorting: sorting,
      onSortingChange: newSorting => {
        dispatch(getOrganizationList({ limit, page, sorting: newSorting }, formName));
      },

      currentPage: page,
      pageSize: limit,
      totalCount: totalRecord,
      onChangeCurrentPage: (newPage) => {
        if (newPage != page ) {
          dispatch(getOrganizationList({ limit, page: newPage, sorting }, formName));
        }
      },

      onDoAction: (args) => {
        switch (args.type) {
          case 'adding': {
            ownProps.history.push('/organization/add');
            break;
          }
          case 'editing': {
            ownProps.history.push(`/organization/${args.row.id}`);
            break;
          }
          case 'deleting': {
            dispatch(openQuestionDialog(DELETE_ORGANIZATION_DIALOG, args));
            break;
          }
          default: break;
        }
      }
    }
  };

  const methods = {
    onLoadData: () => {
      const sort = sorting.length > 0 ? sorting : [{columnName: 'name', direction: 'asc'}];
      dispatch(getOrganizationList({ limit, page, sorting: sort }, formName));
    },
    onSuggestionsFetchRequested: (value) => {
      dispatch(getOrganizationSuggestions({ limit: 20, search: value }, formName));
    },
    onSuggestionsClearRequested: () => dispatch(clearOrganizationSuggestions()),
    onSuggestionSelected: (value) => {
      dispatch(getOrganizationList({ limit, id: value? value.id : null}), formName);
    },
    onClearSuggestionSelected: () => {
      dispatch(getOrganizationList({ limit, page, sorting }, formName));
    },
  };

  return { ...props, ...methods, ...ownProps };
})(OrganizationList);
