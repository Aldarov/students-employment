import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class QuestionDialog extends Component {
  shouldComponentUpdate({ open }) {
    return open !== this.props.open;
  }

  handleYes = () => this.props.onYes(this.props.args);

  render() {
    const { open, onNo, title, contentText } = this.props;

    return (
      <Dialog
        open={open}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title || ''}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{contentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleYes} color="primary" autoFocus >
            Да
          </Button>
          <Button onClick={onNo} color="primary">
            Нет
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

QuestionDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  contentText: PropTypes.string,
  args: PropTypes.object,
  onYes: PropTypes.func,
  onNo: PropTypes.func
};

export default QuestionDialog;
