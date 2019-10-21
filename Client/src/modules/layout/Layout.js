import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { layoutStyles } from './styles';
import { Header } from '../header';
import { Sidebar } from '../sidebar';
import { BusyIndicator } from '../busyIndicator';

@withStyles(layoutStyles)
class Layout extends Component {
  componentDidMount() {
    this.props.onLoadData();
  }

  render() {
    const {
      classes,
      headerProps,
      openedSidebar, onCloseSidebar,
      onRedirect,
      children,
      formName,
      onHeaderLeftButtonClick, onHeaderRightButtonClick
    } = this.props;

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
          onClose={onCloseSidebar}
          onRedirect={onRedirect}
        />
        <div className={classes.content}>
          {children}
        </div>
      </div>
    );
  }
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

export default Layout;
