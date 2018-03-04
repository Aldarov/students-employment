import { connectAdvanced } from 'react-redux';

import EmploymentList from './EmploymentList';
import { openSidebar } from '../sidebar';
import { fetchingStart, fetchingEnd } from '../busyIndicator';
import { openQuestionDialog, closeQuestionDialog } from '../dialogs';
import {
  getEmploymentList,
  deleteEmployment,
  getEmploymentSuggestions,
  clearEmploymentSuggestions
} from './employmentList.actions';


const formName = 'employmentList';
const DELETE_EMPLOYMENT_DIALOG = 'DELETE_EMPLOYMENT_DIALOG';

export default connectAdvanced( dispatch => (state, ownProps) => {
  const { limit, page, totalRecord, sorting } = state.employment.list.info;

  const props = {
    formName: formName,
    headerProps: {
      onLeftButtonClick: () => dispatch(openSidebar()),
      leftButtonIconName: 'Menu',
      title: 'Трудоустройство'
    },

    data: state.employment.list.data,
    searchSuggestions: state.employment.list.searchSuggestions,

    deleteEmploymentDialogProps: {
      dialogName: DELETE_EMPLOYMENT_DIALOG,
      contentText: 'Удалить данную запись?',
      onYes: args => {
        dispatch(fetchingStart(formName));
        dispatch(deleteEmployment(args.row.id), () => dispatch(fetchingEnd(formName)));
        dispatch(closeQuestionDialog(DELETE_EMPLOYMENT_DIALOG));
      },
      onNo: () => {
        dispatch(closeQuestionDialog(DELETE_EMPLOYMENT_DIALOG));
      }
    },

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
      onSortingChange: (newSorting) => {
        dispatch(fetchingStart(formName));
        dispatch(getEmploymentList({ limit, page, sorting: newSorting }, () => dispatch(fetchingEnd(formName))));
      },

      currentPage: page,
      pageSize: limit,
      totalCount: totalRecord,
      onChangeCurrentPage: (newPage) => {
        if (newPage != page ) {
          dispatch(fetchingStart(formName));
          dispatch(getEmploymentList({ limit, page: newPage, sorting }, () => dispatch(fetchingEnd(formName))));
        }
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
            dispatch(openQuestionDialog(DELETE_EMPLOYMENT_DIALOG, args));
            break;
          }
          default: break;
        }
      }
    },
  };

  const methods = {
    onLoadData: () => {
      dispatch(fetchingStart(formName));
      dispatch(getEmploymentList({ limit, page, sorting }, () => dispatch(fetchingEnd(formName))));
    },

    onSuggestionsFetchRequested: (value) => {
      dispatch(fetchingStart(formName));
      dispatch(getEmploymentSuggestions({ limit: 20, search: value }, () => dispatch(fetchingEnd(formName))));
    },
    onSuggestionsClearRequested: () => dispatch(clearEmploymentSuggestions()),
    onSuggestionSelected: (value) => {
      dispatch(fetchingStart(formName));
      dispatch(getEmploymentList({ limit, id: value ? value.id : null }, dispatch(fetchingEnd(formName))));
    },
    onClearSuggestionSelected: () => dispatch(getEmploymentList({ limit, page, sorting })),
  };

  return { ...props, ...methods, ...ownProps };
})(EmploymentList);
