import { connectAdvanced } from 'react-redux';
import qs from 'query-string';

import { login } from './auth.actions';
import Login from './Login';

const formName = 'login';

export default connectAdvanced(dispatch => (state, ownProps) => {
  console.log('login', ownProps);
  const { emp_id: employmentId, id: sessionId } = qs.parse(ownProps.location.search);

  const props = {
    isAuth: state.isAuth
  };

  const methods = {
    onLogin: () => dispatch(login({ employmentId, sessionId }, formName))
  };

  return { ...props, ...methods, ...ownProps };
})(Login);
