import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';

import Layout from './Layout';
import { AuthDispatcher } from '../auth';
import { CLOSE_SIDEBAR } from '../../constants';
import {
  getEduForms, getDirectionTypes, getDistributionTypes
} from './dictionaries.actions';

const mapStateToProps = (state, props) => {
  return {
    formName: props.formName,
    openedSidebar: state.sidebar.openedSidebar
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onRedirect: url => () => {
      props.history.push(url);
      dispatch({ type: CLOSE_SIDEBAR });
    },
    onLoadData: () => {
      dispatch(getEduForms());
      dispatch(getDirectionTypes());
      dispatch(getDistributionTypes());
    },
    onCloseSidebar: () => dispatch({ type: CLOSE_SIDEBAR }),
  };
};

export default compose(
  withRouter,
  AuthDispatcher,
  connect(mapStateToProps, mapDispatchToProps)
)(Layout);

connect(mapStateToProps, mapDispatchToProps)(Layout);
