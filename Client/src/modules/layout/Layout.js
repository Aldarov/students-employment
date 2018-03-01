import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { withStyles } from 'material-ui/styles';

import { layoutStyles } from './styles';
import { Header } from '../header';
import { Sidebar } from '../sidebar';
import { QuestionDialog } from '../dialogs';

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
      dialogOpen, dialogProps,
      children
    } = this.props;

    return (
      <div className={classes.container}>
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
        <QuestionDialog
          open={dialogOpen}
          dialogProps={dialogProps}
        />
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

  dialogOpen: PropTypes.bool,
  dialogProps: PropTypes.object,
  children: PropTypes.any,
};

export default Layout;
