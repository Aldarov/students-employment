import { connectAdvanced } from 'react-redux';

import OrganizationList from './OrganizationList';
import { openSidebar } from '../sidebar';
import { fetchingStart, fetchingEnd } from '../busyIndicator';

export default connectAdvanced( dispatch => (state, ownProps) => {
  const props = {
    headerProps: {
      onLeftButtonClick: () => dispatch(openSidebar()),
      leftButtonIconName: 'Menu',
      title: 'Организации'
    },
  };

  const methods = {

  };

  return { ...props, ...methods, ...ownProps };
})(OrganizationList);
