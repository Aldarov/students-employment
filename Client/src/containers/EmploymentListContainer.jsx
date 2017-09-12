import { connect } from 'react-redux';
import List from '../Components/List';
import {
  changeTitle, getEmploymentList,
  getSearchSuggestions, clearSearchSuggestions
} from '../actions';

const mapStateToProps = (state) => {
  return {
    data: state.employment.list.data,
    columns: [
      { name: 'id', title: 'Код' },
      { name: 'faculty', title: 'Факультет' },
      { name: 'speciality', title: 'Специальность' },
      { name: 'entranceYear', title: 'Год поступления' },
      { name: 'eduForm', title: 'Форма обучения' },
    ],
    pageSize: state.employment.list.info.limit,
    currentPage: state.employment.list.info.page - 1,
    totalCount: state.employment.list.info.totalRecord,
    loading: state.fetching,
    searchPlaceholder: 'Для поиска введите значения через пробел',
    searchSuggestions: state.employment.list.searchSuggestions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeTitle: () => dispatch(changeTitle('Трудоустройство')),
    onLoadData: (page) => dispatch(getEmploymentList({ limit: 15, page: page + 1 })),
    onSuggestionsFetchRequested: (valueObj) => dispatch(getSearchSuggestions({ limit: 20, search: valueObj.value })),
    onSuggestionsClearRequested: () => dispatch(clearSearchSuggestions())
  };
};

const EmploymentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

export default EmploymentListContainer;
