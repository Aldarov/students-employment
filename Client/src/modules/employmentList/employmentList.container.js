import { connectAdvanced } from 'react-redux';

import EmploymentList from './EmploymentList';
import { OPEN_SIDEBAR } from '../../constants';

export default connectAdvanced( dispatch => (state, ownProps) => {
  const props = {
    headerProps: {
      onLeftButtonClick: () => dispatch({ type: OPEN_SIDEBAR }),
      leftButtonIconName: 'Menu',
      title: 'Трудоустройство'
    },
  };

  const methods = {

  };

  return { ...props, ...methods, ...ownProps };
})(EmploymentList);
