import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export default function QuestionDialog(props) {
  const { open, dialogProps, args } = props;
  const { title, contentText, onYes, onNo } = dialogProps || {};

  return (
    <Dialog
      open={open}
      transition={Transition}
      keepMounted
    >
      <DialogTitle>{title || ''}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {contentText}
        </DialogContentText>
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

