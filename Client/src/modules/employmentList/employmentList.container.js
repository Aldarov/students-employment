import { connectAdvanced } from 'react-redux';

import EmploymentList from './EmploymentList';
import { openSidebar } from '../sidebar';
import { fetchingStart, fetchingEnd } from '../busyIndicator';

const formName = 'employmentList';

export default connectAdvanced( dispatch => (state, ownProps) => {
  // const { limit, page, totalRecord, sorting } = state.employment.list.info;

  const props = {
    headerProps: {
      onLeftButtonClick: () => dispatch(openSidebar()),
      leftButtonIconName: 'Menu',
      title: 'Трудоустройство'
    },
    formName: formName,
    // data: state.employment.list.data,

  };

  const methods = {
    onLoadData: () => {
      // dispatch(fetchingStart(formName));
    },
  };

  return { ...props, ...methods, ...ownProps };
})(EmploymentList);
