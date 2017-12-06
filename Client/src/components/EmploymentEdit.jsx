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

import DirectionEdit from './DirectionEdit';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

class EmploymentEdit extends Component {
  render () {
    const { classes, open, title, onClose, tableRow, directionTypes } = this.props;

    return (
      <Dialog
        fullScreen
        open={open}
        onRequestClose={onClose}
        transition={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="contrast" onClick={onClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <DirectionEdit
          tableRow={tableRow}
          directionTypes={directionTypes}
        />
      </Dialog>
    );
  }
}

EmploymentEdit.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  tableRow: PropTypes.number,
  directionTypes: PropTypes.array
};

export default withStyles(styles)(EmploymentEdit);
