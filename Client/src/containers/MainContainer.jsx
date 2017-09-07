import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import AuthHOC from './AuthHOC';
import Main from '../Components/Main';

const mapStateToProps = (state) => {
  return {
    title: state.header.title
  };
};

const mapDispatchToProps = () => {
  return {
  };
};

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);


export default AuthHOC(withRouter(MainContainer));
