import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { withStyles } from 'material-ui/styles';

import { layoutStyles } from './styles';
import { Header } from '../header';
import { Sidebar } from '../sidebar';
import { BusyIndicator } from '../busyIndicator';

@withStyles(layoutStyles)
class Layout extends Component {
  componentWillMount() {
    this.props.onLoadData();
  }

  render() {
    const {
      classes,
      headerProps,
      openedSidebar, onCloseSidebar,
      onRedirect,
      children,
      formName
    } = this.props;

    return (
      <div className={classes.container}>
        <BusyIndicator formName={formName}/>
        <Header
          openedSidebar={openedSidebar}
          headerProps={headerProps}
        />
        <Sidebar
          open={openedSidebar}
          onClose={onCloseSidebar}
          onRedirect={onRedirect}
        />
        <div className={classes.content}>
          {children}
        </div>
        <Alert stack={{limit: 5}} timeout={'none'}/>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object,
  headerProps: PropTypes.object.isRequired,

  onRedirect: PropTypes.func,
  onLoadData: PropTypes.func,
  onCloseSidebar: PropTypes.func,
  openedSidebar: PropTypes.bool,

  children: PropTypes.any,
  formName: PropTypes.string,
};

export default Layout;
