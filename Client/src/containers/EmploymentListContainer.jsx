import { connectAdvanced } from 'react-redux';

import EmploymentList from '../components/EmploymentList';
import {
  changeTitle,
  getEmploymentList,
  getEmploymentSuggestions, clearEmploymentSuggestions,
} from '../actions';

export default connectAdvanced( dispatch => (state, ownProps) => {
  const { limit, page, totalRecord, sorting } = state.employment.list.info;

  const props = {
    data: state.employment.list.data,
    columns: [
      { name: 'id', title: 'Код' },
      { name: 'faculty', title: 'Факультет' },
      { name: 'speciality', title: 'Специальность' },
      { name: 'entranceYear', title: 'Год поступления' },
      { name: 'eduForm', title: 'Форма обучения' },
    ],
    pageSize: limit,
    currentPage: page,
    totalCount: totalRecord,
    sorting: sorting,
    loading: state.fetching,
    searchPlaceholder: 'Для поиска введите значения через пробел',
    searchSuggestions: state.employment.list.searchSuggestions,
  };

  const methods = {
    onChangeTitle: () => dispatch(changeTitle('Трудоустройство')),
    onLoadData: () => dispatch(getEmploymentList({ limit, page })),
    onChangeSorting: (newSorting) => dispatch(getEmploymentList({ limit, page, sorting: newSorting })),
    onChangePage: (newPage) => {
      if (newPage != page )
        dispatch(getEmploymentList({ limit, page: newPage, sorting }));
    },

    onSuggestionsFetchRequested: (value) => dispatch(getEmploymentSuggestions({ limit: 7, search: value })),
    onSuggestionsClearRequested: () => dispatch(clearEmploymentSuggestions()),
    onSuggestionSelected: (value) => dispatch(getEmploymentList({ limit, id: value })),
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

