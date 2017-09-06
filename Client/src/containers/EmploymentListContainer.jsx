import { connect } from 'react-redux';
import EmploymentList from '../Components/EmploymentList';
import { changeTitle } from '../actions';

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeTitle: (t) => dispatch(changeTitle(t))
  };
};

const EmploymentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmploymentList);

export default EmploymentListContainer;
