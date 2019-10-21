import { connect } from 'react-redux';
import qs from 'query-string';

import { onLogin } from './auth.actions';
import Login from './Login';
import { bindActionCreators } from 'redux';

const formName = 'login';


const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth
  };
};

const mapDispatchToProps = (dispatch, { location }) => {
  const { emp_id: employmentId, id: sessionId } = qs.parse(location.search);
  return bindActionCreators({
    onLogin: onLogin(employmentId, sessionId)
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

export {
  formName
};
