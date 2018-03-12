import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

import { dialogStyles } from './styles';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

@withStyles(dialogStyles)
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
        transition={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton className={classes.button} onClick={onClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
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

export default Contract;
