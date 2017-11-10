import React from 'react';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import MenuIcon from 'material-ui-icons/Menu';
import ArrowBack from 'material-ui-icons/ArrowBack';
import Close from 'material-ui-icons/Close';

// const Aux = props => props.children;

export default function Header(params) {
  const { classes, title, openColumn, onReturn, onOpenLeftColumn, onClose, onSave, pristine, submitting } = params;
  return (
    <AppBar className={classNames(classes.appBar, openColumn && classes.appBarShift)}>
      <Toolbar disableGutters={!openColumn}>
        <IconButton
          color="contrast"
          aria-label="open drawer"
          onClick={onReturn || onClose || onOpenLeftColumn}
          className={classNames(classes.menuButton, openColumn && classes.hide)}
        >
          {
            (onReturn && <ArrowBack/>) ||
            (onClose && <Close/>) ||
            (onOpenLeftColumn && <MenuIcon/>)
          }
        </IconButton>
        <Typography type="title" color="inherit" noWrap className={classes.flex}>
          {title}
        </Typography>
        {
          onSave &&
          <Button
            className={classes.menuButton}
            color="contrast"
            onClick={onSave}
            disabled={pristine || submitting}
          >
            Сохранить
          </Button>
        }
      </Toolbar>
    </AppBar>
  );
}
