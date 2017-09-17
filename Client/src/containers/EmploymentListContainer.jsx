import { connectAdvanced } from 'react-redux';
import EmploymentList from '../Components/EmploymentList';
import {
  changeTitle,
  getEmploymentList,
  getSearchSuggestions, clearSearchSuggestions
} from '../actions';

export default connectAdvanced((dispatch) => (state, ownProps) => {
  const pageSize = 14;
  const { limit, page, totalRecord, sorting } = state.employment.list.info;

  const newState = {
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

  const events = {
    onChangeTitle: () => dispatch(changeTitle('Трудоустройство')),
    onLoadData: () => dispatch(getEmploymentList({ limit: pageSize, page })),
    onChangeSorting: (newSorting) => dispatch(getEmploymentList({ limit: pageSize, page, sorting: newSorting })),
    onChangePage: (newPage) => {
      if (newPage != page )
        dispatch(getEmploymentList({ limit: pageSize, page: newPage, sorting }));
    },
    onSuggestionsFetchRequested: (value) => dispatch(getSearchSuggestions({ limit: 7, search: value })),
    onSuggestionsClearRequested: () => dispatch(clearSearchSuggestions()),
    onClearSelectSuggestion: () => dispatch(getEmploymentList({ limit: pageSize, page, sorting })),
    onSuggestionSelected: (value) => dispatch(getEmploymentList({ limit: pageSize, id: value }))
  };

  return { ...newState, ...ownProps, ...events };
})(EmploymentList);

