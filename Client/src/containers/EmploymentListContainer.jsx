import { connectAdvanced } from 'react-redux';

import { EmploymentList } from '../components/employmentList';
import {
  getEmploymentList,
  getEmploymentSuggestions,
  clearEmploymentSuggestions,
  openSidebar,
  deleteEmployment,
  openQuestionDialog, closeQuestionDialog,
} from '../actions';

const initHeader = (dispatch, onInitHeader) => onInitHeader({
  onLeftButtonClick: () => dispatch(openSidebar()),
  leftButtonIconName: 'Menu',
  title: 'Трудоустройство'
});

export default connectAdvanced( dispatch => (state, ownProps) => {
  const { limit, page, totalRecord, sorting } = state.employment.list.info;

  const props = {
    data: state.employment.list.data,

    gridSetting: {
      columns: [
        { name: 'id', title: 'Код' },
        { name: 'faculty', title: 'Факультет' },
        { name: 'speciality', title: 'Специальность' },
        { name: 'entranceYear', title: 'Год поступления' },
        { name: 'eduForm', title: 'Форма обучения' },
      ],
      defaultColumnWidths: [
        { columnName: 'id', width: 100 },
        { columnName: 'faculty', width: 100 },
        { columnName: 'speciality', width: 700 },
        { columnName: 'entranceYear', width: 200 },
        { columnName: 'eduForm', width: 120 },
      ],

      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,

      allowSorting: true,
      sorting: sorting,
      onSortingChange: (newSorting) => dispatch(getEmploymentList({ limit, page, sorting: newSorting })),

      currentPage: page,
      pageSize: limit,
      totalCount: totalRecord,
      onChangeCurrentPage: (newPage) => {
        if (newPage != page )
          dispatch(getEmploymentList({ limit, page: newPage, sorting }));
      },

      onDoAction: (args) => {
        switch (args.type) {
          case 'adding': {
            ownProps.history.push('/employment/add');
            break;
          }
          case 'editing': {
            ownProps.history.push(`/employment/${args.row.id}`);
            break;
          }
          case 'deleting': {
            ownProps.onInitDialog({
              contentText: 'Удалить данную запись?',
              onYes: () => {
                dispatch(deleteEmployment(args.row.id));
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
    },

    loading: state.fetching,
    searchSuggestions: state.employment.list.searchSuggestions,
  };

  const methods = {
    onLoadData: () => {
      initHeader(dispatch, ownProps.onInitHeader);
      dispatch(getEmploymentList({ limit, page, sorting }));
    },

    onSuggestionsFetchRequested: (value) => dispatch(getEmploymentSuggestions({ limit: 20, search: value })),
    onSuggestionsClearRequested: () => dispatch(clearEmploymentSuggestions()),
    onSuggestionSelected: (value) => dispatch(getEmploymentList({ limit, id: value? value.id : null})),
    onClearSuggestionSelected: () => dispatch(getEmploymentList({ limit, page, sorting })),
  };

  return { ...props, ...methods, ...ownProps };
})(EmploymentList);

