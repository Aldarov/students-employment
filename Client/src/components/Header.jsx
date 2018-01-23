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
    classes, openedSidebar, headerProps
  } = params;

  const { onLeftButtonClick, leftButtonIconName, onRightButtonClick, rightButtonDisabled, title } = headerProps || {};
  const Icon = leftButtonIconName && Icons[leftButtonIconName];

  return (
    <AppBar className={classNames(classes.appBar, openedSidebar && classes.appBarShift)}>
      <Toolbar disableGutters={!openedSidebar}>
        {
          <IconButton
            aria-label="open drawer"
            onClick={onLeftButtonClick}
            className={classNames(classes.menuButton, openedSidebar && classes.hide)}
          >
            {Icon && <Icon style={{color: 'white'}}/>}
          </IconButton>
        }
        <Typography type="title" color="inherit" noWrap className={classes.flex}>
          {title}
        </Typography>
        {
          onRightButtonClick &&
          <Button
            className={classes.menuButton}
            color="secondary"
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
