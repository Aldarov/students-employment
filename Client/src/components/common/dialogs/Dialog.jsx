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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  toolbar: {
    marginLeft: '-20px'
  },
  flex: {
    flex: 1,
  },
  content: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  field: {
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: '300px',
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
  },
  horizontal: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    color: 'white'
  }
});

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

export default withStyles(styles)(Contract);
