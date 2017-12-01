import { connectAdvanced } from 'react-redux';
import OrganizationList from '../components/OrganizationList';
import { openSidebar } from '../actions';

export default connectAdvanced( dispatch => (state, ownProps) => {
  ownProps.onInitHeader({
    onLeftButtonClick: () => dispatch(openSidebar()),
    leftButtonIconName: 'Menu',
    title: 'Организации'
  });

  const props = {

  };

  const methods = {

  };

  return { ...props, ...methods, ...ownProps };
})(OrganizationList);
