import { connect } from 'react-redux';
import OrganizationList from '../components/OrganizationList';
import { changeTitle } from '../actions';

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeTitle: (title) => dispatch(changeTitle(title))
  };
};

const OrganizationListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationList);

export default OrganizationListContainer;
