import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import * as Icons from 'material-ui-icons';
import { withStyles } from 'material-ui/styles';

import { headerStyles } from './styles';

@withStyles(headerStyles)
class Header extends Component {
  render() {
    const { classes, openedSidebar, headerProps } = this.props;

    const { onLeftButtonClick, leftButtonIconName, onRightButtonClick, rightButtonDisabled, title } = headerProps || {};
    const Icon = leftButtonIconName && Icons[leftButtonIconName];

    return (
      <AppBar className={classes.appBar}>
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
          <Typography type="title" color="inherit" noWrap className={classes.flex} variant={'title'}>
            {title}
          </Typography>
          {
            onRightButtonClick &&
            <Button
              className={classNames(classes.menuButton, !rightButtonDisabled && classes.rightButtonColor)}
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
}

Header.propTypes = {
  classes: PropTypes.object,
  openedSidebar: PropTypes.bool,
  headerProps: PropTypes.object,
};

export default Header;
