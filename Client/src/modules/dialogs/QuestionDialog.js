import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Slide from '@material-ui/core/Slide';

// function Transition(props) {
//   return <Slide direction="up" {...props} />;
// }

export default function QuestionDialog(props) {
  const { open, dialogProps, args } = props;
  const { title, contentText, onYes, onNo } = dialogProps || {};

  return (
    <Dialog
      open={open}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      // transition={Transition}
      // keepMounted
    >
      <DialogTitle id='alert-dialog-title'>{title || ''}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onYes(args)} color="primary" autoFocus >
          Да
        </Button>
        <Button onClick={onNo} color="primary">
          Нет
        </Button>
      </DialogActions>
    </Dialog>
  );
}

QuestionDialog.propTypes = {
  open: PropTypes.bool,
  dialogProps: PropTypes.object,
  args: PropTypes.object,
};
