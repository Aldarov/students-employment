import { connectAdvanced } from 'react-redux';

import EmploymentList from '../components/EmploymentList';
import {
  changeTitle,
  getEmploymentList,
  getEmploymentSuggestions,
  clearEmploymentSuggestions,
  openLeftColumn
} from '../actions';

export default connectAdvanced( dispatch => (state, ownProps) => {
  const { limit, page, totalRecord, sorting } = state.employment.list.info;

  ownProps.onInitHeader({
    onLeftButtonClick: () => dispatch(openLeftColumn),
    leftButtonIconName: 'Menu',
    // onRightButtonClick,
    // rightButtonDisabled,
    title: 'sds1w'
  });

  const props = {
    data: state.employment.list.data,
    columns: [
      { name: 'id', title: 'Код' },
      { name: 'faculty', title: 'Факультет' },
      { name: 'speciality', title: 'Специальность' },
      { name: 'entranceYear', title: 'Год поступления' },
      { name: 'eduForm', title: 'Форма обучения' },
    ],
    listColumnWidths: { id: 100, faculty: 100, speciality: 700, entranceYear: 200, eduForm: 120},
    pageSize: limit,
    currentPage: page,
    totalCount: totalRecord,
    sorting: sorting,
    loading: state.fetching,
    searchSuggestions: state.employment.list.searchSuggestions,
  };

  const methods = {
    onChangeTitle: () => dispatch(changeTitle('Трудоустройство')),
    onLoadData: () => dispatch(getEmploymentList({ limit, page, sorting })),
    onChangeSorting: (newSorting) => dispatch(getEmploymentList({ limit, page, sorting: newSorting })),
    onChangePage: (newPage) => {
      if (newPage != page )
        dispatch(getEmploymentList({ limit, page: newPage, sorting }));
    },

    onSuggestionsFetchRequested: (value) => dispatch(getEmploymentSuggestions({ limit: 7, search: value })),
    onSuggestionsClearRequested: () => dispatch(clearEmploymentSuggestions()),
    onSuggestionSelected: (value) => dispatch(getEmploymentList({ limit, id: value? value.id : null})),
    onClearSuggestionSelected: () => dispatch(getEmploymentList({ limit, page, sorting })),

    onDoAction: (args) => {
      switch (args.type) {
        case 'adding': {

          break;
        }
        case 'editing': {
          ownProps.history.push(`/employment/${args.row.id}`);
          break;
        }
        case 'deleting': {

          break;
        }
        default: break;
      }
    },
  };

  return { ...props, ...methods, ...ownProps };
})(EmploymentList);

