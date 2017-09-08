import { connect } from 'react-redux';
import EmploymentList from '../Components/EmploymentList';
import { changeTitle, GetEmploymentList } from '../actions';

const mapStateToProps = (state) => {
  return {
    employmentList: state.employment.list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeTitle: (title) => dispatch(changeTitle(title)),
    onGetEmploymentList: (params) => dispatch(GetEmploymentList(params))
  };
};

const EmploymentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmploymentList);

export default EmploymentListContainer;
