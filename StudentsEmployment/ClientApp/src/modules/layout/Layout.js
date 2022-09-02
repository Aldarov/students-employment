import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { layoutStyles } from './styles';
import { Header } from '../header';
import { Sidebar } from '../sidebar';
import { BusyIndicator } from '../busyIndicator';
import { CLOSE_SIDEBAR } from '../../constants';

const Layout = (props) => {
  const openedSidebar = useSelector(state => state.sidebar.openedSidebar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRedirect = useCallback(url => () => {
    navigate(url)
    dispatch({ type: CLOSE_SIDEBAR });
  }, [navigate]);

  const handleCloseSidebar = useCallback(() => dispatch({ type: CLOSE_SIDEBAR }));

  const {
    classes,
    headerProps,
    children,
    formName,
    onHeaderLeftButtonClick, onHeaderRightButtonClick
  } = props;

  return (
    <div className={classes.container}>
      <BusyIndicator formName={formName}/>
      <Header
        openedSidebar={openedSidebar}
        headerProps={headerProps}
        onLeftButtonClick={onHeaderLeftButtonClick}
        onRightButtonClick={onHeaderRightButtonClick}
      />
      <Sidebar
        open={openedSidebar}
        onClose={handleCloseSidebar}
        onRedirect={handleRedirect}
      />
      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
}

Layout.propTypes = {
  classes: PropTypes.object,
  headerProps: PropTypes.object.isRequired,
  onHeaderLeftButtonClick: PropTypes.func,
  onHeaderRightButtonClick: PropTypes.func,

  onRedirect: PropTypes.func,
  onLoadData: PropTypes.func,
  onCloseSidebar: PropTypes.func,
  openedSidebar: PropTypes.bool,

  children: PropTypes.any,
  formName: PropTypes.string,
};

export default withStyles(layoutStyles)(Layout);
