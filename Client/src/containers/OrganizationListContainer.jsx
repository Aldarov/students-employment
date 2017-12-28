import { connectAdvanced } from 'react-redux';
import OrganizationList from '../components/OrganizationList';
import { openSidebar } from '../actions';

const initHeader = (dispatch, onInitHeader) => onInitHeader({
  onLeftButtonClick: () => dispatch(openSidebar()),
  leftButtonIconName: 'Menu',
  title: 'Организации'
});

export default connectAdvanced( dispatch => (state, ownProps) => {
  const props = {

  };

  const methods = {
    onLoadData: () => {
      initHeader(dispatch, ownProps.onInitHeader);
    },
  };

  return { ...props, ...methods, ...ownProps };
})(OrganizationList);
