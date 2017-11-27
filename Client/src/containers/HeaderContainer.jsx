import { connectAdvanced } from 'react-redux';

import Header from '../components/Header';

export default connectAdvanced( () => (state, ownProps) => {
  const props = {

  };

  const methods = {

  };
  return { ...props, ...methods, ...ownProps };
})(Header);
