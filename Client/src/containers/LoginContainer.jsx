import { connectAdvanced } from 'react-redux';
import qs from 'query-string';

import { login } from '../actions';
import Login from '../components/Login';

export default connectAdvanced( dispatch => (state, ownProps) => {
  const {emp_id: employmentId, id: sessionId} = qs.parse(ownProps.location.search);

  const props = {
    isAuth: state.isAuth
  };

  const methods = {
    onLogin: () => dispatch(login({employmentId, sessionId}))
  };

  return { ...props, ...methods, ...ownProps };
})(Login);
