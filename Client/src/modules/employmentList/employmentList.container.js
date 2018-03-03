import { connectAdvanced } from 'react-redux';

import EmploymentList from './EmploymentList';
import { openSidebar } from '../sidebar';
import { fetchingStart, fetchingEnd } from '../busyIndicator';
import { openQuestionDialog, closeQuestionDialog } from '../dialogs';

const formName = 'employmentList';
const DELETE_EMPLOYMENT_DIALOG = 'DELETE_EMPLOYMENT_DIALOG';


export default connectAdvanced( dispatch => (state, ownProps) => {
  const { limit, page, totalRecord, sorting } = state.employment.list.info;

  const props = {
    headerProps: {
      onLeftButtonClick: () => dispatch(openSidebar()),
      leftButtonIconName: 'Menu',
      title: 'Трудоустройство'
    },
    formName: formName,
    data: state.employment.list.data,
    searchSuggestions: state.employment.list.searchSuggestions,
    deleteEmploymentDialogProps: {
      dialogName: DELETE_EMPLOYMENT_DIALOG,
      contentText: 'Удалить данную запись?',
      onYes: args => {
        console.log('onYes', args);
        // dispatch(deleteEmployment(args.row.id));
        dispatch(closeQuestionDialog(DELETE_EMPLOYMENT_DIALOG));
      },
      onNo: () => {
        dispatch(closeQuestionDialog(DELETE_EMPLOYMENT_DIALOG));
      }
    }
  };

  const methods = {
    onLoadData: () => {
      // dispatch(fetchingStart(formName));
      // dispatch(getEmploymentList({ limit, page, sorting }));
    },
    onClickDemo: () => {
      const args = {asdas: 1212, ddddd: 'dddd' };
      dispatch(openQuestionDialog(DELETE_EMPLOYMENT_DIALOG, args));
    }

    // onSuggestionsFetchRequested: (value) => dispatch(getEmploymentSuggestions({ limit: 20, search: value })),
    // onSuggestionsClearRequested: () => dispatch(clearEmploymentSuggestions()),
    // onSuggestionSelected: (value) => dispatch(getEmploymentList({ limit, id: value ? value.id : null})),
    // onClearSuggestionSelected: () => dispatch(getEmploymentList({ limit, page, sorting })),
  };

  return { ...props, ...methods, ...ownProps };
})(EmploymentList);
