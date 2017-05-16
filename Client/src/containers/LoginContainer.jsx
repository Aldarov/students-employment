import { connect } from 'react-redux';

import { login } from '../actions';
import Login from '../components/Login';

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (l, p, from) => dispatch(login(l, p, from))
  };
}

export default connect(null, mapDispatchToProps)(Login);
