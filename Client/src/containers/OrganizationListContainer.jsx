import { connectAdvanced } from 'react-redux';
import { OrganizationList } from '../components/organizationList';
import {
  openSidebar,
  getOrganizationList, getOrganizationSuggestions, clearOrganizationSuggestions,
  deleteOrganization,
  openQuestionDialog, closeQuestionDialog,
} from '../actions';

const initHeader = (dispatch, onInitHeader) => onInitHeader({
  onLeftButtonClick: () => dispatch(openSidebar()),
  leftButtonIconName: 'Menu',
  title: 'Организации'
});

export default connectAdvanced( dispatch => (state, ownProps) => {
  const { limit, page, totalRecord, sorting } = state.organization.list.info;

  const props = {
    data: state.organization.list.data,
    loading: state.fetching,
    searchSuggestions: state.organization.list.searchSuggestions,

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
      onSortingChange: (newSorting) => dispatch(getOrganizationList({ limit, page, sorting: newSorting })),

      currentPage: page,
      pageSize: limit,
      totalCount: totalRecord,
      onChangeCurrentPage: (newPage) => {
        if (newPage != page )
          dispatch(getOrganizationList({ limit, page: newPage, sorting }));
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
            ownProps.onInitDialog({
              contentText: 'Удалить данную запись?',
              onYes: () => {
                dispatch(deleteOrganization(args.row.id));
                dispatch(closeQuestionDialog());
              },
              onNo: () => {
                dispatch(closeQuestionDialog());
              }
            });
            dispatch(openQuestionDialog());
            break;
          }
          default: break;
        }
      }
    }
  };

  const methods = {
    onLoadData: () => {
      initHeader(dispatch, ownProps.onInitHeader);
      const sort = sorting.length > 0 ? sorting :
        [{columnName: 'name', direction: 'asc'}];
      dispatch(getOrganizationList({ limit, page, sorting: sort }));
    },
    onSuggestionsFetchRequested: (value) => dispatch(getOrganizationSuggestions({ limit: 7, search: value })),
    onSuggestionsClearRequested: () => dispatch(clearOrganizationSuggestions()),
    onSuggestionSelected: (value) => dispatch(getOrganizationList({ limit, id: value? value.id : null})),
    onClearSuggestionSelected: () => dispatch(getOrganizationList({ limit, page, sorting })),
  };

  return { ...props, ...methods, ...ownProps };
})(OrganizationList);
