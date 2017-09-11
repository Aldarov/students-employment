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
    currentPage: state.employment.list.info.page,
    totalCount: state.employment.list.info.totalRecord,
    loading: state.fetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeTitle: () => dispatch(changeTitle('Трудоустройство')),
    onLoadData: (page) => dispatch(GetEmploymentList({ limit: 20, page }))
  };
};

const EmploymentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

export default EmploymentListContainer;
