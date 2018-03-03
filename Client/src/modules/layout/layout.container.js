import { connectAdvanced } from 'react-redux';
import { withRouter } from 'react-router';

import Layout from './Layout';
import { AuthDispatcher } from '../auth';
import { CLOSE_SIDEBAR } from '../../constants';
import {
  getEduForms, getDirectionTypes, getDistributionTypes,
} from './dictionaries.actions';

export default withRouter(AuthDispatcher(
  connectAdvanced(dispatch => (state, ownProps) => {
    const props = {
      children: ownProps.children,
      formName: ownProps.formName,
      headerProps: ownProps.headerProps,

      openedSidebar: state.sidebar.openedSidebar,
    };

    const methods = {
      onRedirect: url => () => {
        ownProps.history.push(url);
        dispatch({ type: CLOSE_SIDEBAR });
      },
      onLoadData: () => {
        dispatch(getEduForms());
        dispatch(getDirectionTypes());
        dispatch(getDistributionTypes());
      },
      onCloseSidebar: () => dispatch({ type: CLOSE_SIDEBAR }),
    };

    return { ...props, ...methods, ...ownProps };
  })(Layout)
));
