import { connectAdvanced } from 'react-redux';

import Layout from './Layout';

export default connectAdvanced( dispatch => (state, ownProps) => {
  const props = {

  };

  const methods = {

  };

  return { ...props, ...methods, ...ownProps };
})(Layout);
