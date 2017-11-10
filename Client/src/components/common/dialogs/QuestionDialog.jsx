import React from 'react';

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

export default function QuestionDialog(params) {
  const { open, title, contentText, onYes, onNo } = params;
  return (
    <Dialog
      open={open}
      transition={Transition}
      keepMounted
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onYes} color="primary" autoFocus >
          Да
        </Button>
        <Button onClick={onNo} color="primary">
          Нет
        </Button>
      </DialogActions>
    </Dialog>
  );
}

