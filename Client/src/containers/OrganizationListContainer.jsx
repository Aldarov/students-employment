import { connectAdvanced } from 'react-redux';
import OrganizationList from '../components/OrganizationList';
import { changeTitle, openLeftColumn } from '../actions';

export default connectAdvanced( dispatch => (state, ownProps) => {
  ownProps.onHeaderLeftButtonClick(() => dispatch(openLeftColumn()));

  const props = {

  };

  const methods = {
    onChangeTitle: (title) => dispatch(changeTitle(title))

  };

  return { ...props, ...methods, ...ownProps };
})(OrganizationList);
