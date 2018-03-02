import { connectAdvanced } from 'react-redux';

import OrganizationList from './OrganizationList';

export default connectAdvanced( dispatch => (state, ownProps) => {
  const props = {

  };

  const methods = {

  };

  return { ...props, ...methods, ...ownProps };
})(OrganizationList);
