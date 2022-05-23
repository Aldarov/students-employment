import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { alertHide } from './alert.actions';

const useStyles = makeStyles({
  snackbarContentRootError: {
    backgroundColor: '#f44336'
  },
  snackbarContentRootSuccess: {
    backgroundColor: '#4caf50'
  }
});

const Alert = () => {
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [snackbarContentRoot, setSnackbarContentRoot] = useState('');

  useEffect(() => {
    if (alert?.info?.severity == 'error') {
      setSnackbarContentRoot(classes.snackbarContentRootError);
    } else if (alert?.info?.severity == 'success') {
      setSnackbarContentRoot(classes.snackbarContentRootSuccess);
    }
  }, [alert?.info?.severity]);

  const handleClose = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(alertHide());
  }, [dispatch]);

  return <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    ContentProps = {{
      classes: {root: snackbarContentRoot}
    }}
    open={alert?.open ?? false}
    onClose={handleClose}
    message={alert?.info?.message ?? undefined}
    action={
      <IconButton
        aria-label="Закрыть"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
    }
  />;
};

export default Alert;
