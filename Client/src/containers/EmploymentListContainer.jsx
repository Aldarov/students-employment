import { connect } from 'react-redux';
import EmploymentList from '../Components/EmploymentList';
// import { actionCreator } from '../actionPath'

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = {

};

const EmploymentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmploymentList);

export default EmploymentListContainer;
