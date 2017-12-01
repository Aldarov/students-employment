import { connectAdvanced } from 'react-redux';
import { withRouter } from 'react-router';

import AuthHOC from './AuthHOC';
import Main from '../components/Main';
import {
  getEduForms, getDirectionTypes, getDistributionTypes, closeSidebar,
} from '../actions';

export default AuthHOC(withRouter(
  connectAdvanced(dispatch => (state, ownProps) => {
    const props = {
      openedSidebar: state.header.openedSidebar,
      dialogOpen: state.dialog.dialogOpen
    };

    const methods = {
      onRedirect: url => () => {
        ownProps.history.push(url);
        dispatch(closeSidebar());
      },
      onLoadData: () => {
        dispatch(getEduForms());
        dispatch(getDirectionTypes());
        dispatch(getDistributionTypes());
      },
      onCloseSidebar: () => dispatch(closeSidebar()),
    };

    return { ...props, ...methods, ...ownProps };
  })(Main)
));

