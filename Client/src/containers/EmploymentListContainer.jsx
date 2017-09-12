import { connect } from 'react-redux';
import List from '../Components/List';
import { changeTitle, GetEmploymentList } from '../actions';

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
    searchPlaceholder: 'Поиск по слову',
    // searchSuggestions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeTitle: () => dispatch(changeTitle('Трудоустройство')),
    onLoadData: (page) => dispatch(GetEmploymentList({ limit: 15, page: page + 1 })),
    // onSuggestionsFetchRequested: (value) => {},
    // onSuggestionsClearRequested: () => {}
  };
};

const EmploymentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

export default EmploymentListContainer;
