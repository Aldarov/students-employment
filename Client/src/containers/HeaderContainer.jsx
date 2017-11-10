import { connectAdvanced } from 'react-redux';

import Header from '../components/Header';

export default connectAdvanced( dispatch => (state, ownProps) => {
  const props = {

  };

  const methods = {

  };
  return { ...props, ...methods, ...ownProps };
})(Header);
