import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import withStyles from '@material-ui/core/styles/withStyles';

import { headerStyles } from './styles';

@withStyles(headerStyles)
class Header extends Component {
  render() {
    const { classes, openedSidebar, headerProps } = this.props;
    const { onLeftButtonClick, leftButtonIconName, onRightButtonClick, rightButtonDisabled, title } = headerProps || {};
    const Icon = leftButtonIconName == 'Menu' ? MenuIcon : (leftButtonIconName == 'ArrowBack' ? ArrowBackIcon : null);

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
