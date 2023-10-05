import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import { dialogStyles } from './styles';


class Contract extends Component {
  render () {
    const {
      classes,
      onClose,
      opened,
      title,
      children,
    } = this.props;

    return (
      <Dialog
        fullScreen
        open={opened}
        onClose={onClose}
      >
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.dialogToolbar}>
            {/*<IconButton className={classes.button} onClick={onClose} aria-label="Close">*/}
            {/*  <CloseIcon />*/}
            {/*</IconButton>*/}
            <Typography type="title" color="inherit" className={classes.flex}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          {children}
        </div>
      </Dialog>
    );
  }
}

Contract.propTypes = {
  classes: PropTypes.object,
  onClose: PropTypes.func,
  opened: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.any,
};

export default withStyles(dialogStyles)(Contract);
