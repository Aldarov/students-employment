import React from 'react';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import * as Icons from 'material-ui-icons';

export default function Header(params) {
  const {
    classes, openColumn,
    headerProps
  } = params;

  const { onLeftButtonClick, leftButtonIconName, onRightButtonClick, rightButtonDisabled, title } = headerProps || {};
  const Icon = leftButtonIconName && Icons[leftButtonIconName];

  return (
    <AppBar className={classNames(classes.appBar, openColumn && classes.appBarShift)}>
      <Toolbar disableGutters={!openColumn}>
        <IconButton
          color="contrast"
          aria-label="open drawer"
          onClick={onLeftButtonClick}
          className={classNames(classes.menuButton, openColumn && classes.hide)}
        >
          {Icon && <Icon />}
        </IconButton>
        <Typography type="title" color="inherit" noWrap className={classes.flex}>
          {title}
        </Typography>
        {
          onRightButtonClick &&
          <Button
            className={classes.menuButton}
            color="contrast"
            onClick={onRightButtonClick}
            disabled={rightButtonDisabled}
          >
            Сохранить
          </Button>
        }
      </Toolbar>
    </AppBar>
  );
}
