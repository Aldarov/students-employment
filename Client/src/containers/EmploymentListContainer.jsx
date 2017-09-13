import { connect } from 'react-redux';
import EmploymentList from '../Components/EmploymentList';
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

const pageSize = 15;

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeTitle: () => dispatch(changeTitle('Трудоустройство')),
    onLoadData: (page) => dispatch(getEmploymentList({ limit: pageSize, page: page + 1 })),
    onSuggestionsFetchRequested: (value) => dispatch(getSearchSuggestions({ limit: 7, search: value })),
    onSuggestionsClearRequested: () => dispatch(clearSearchSuggestions()),
    onSuggestionSelected: (value) => dispatch(getEmploymentList({ limit: pageSize, page: 1, id: value }))
  };
};

const EmploymentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmploymentList);

export default EmploymentListContainer;
