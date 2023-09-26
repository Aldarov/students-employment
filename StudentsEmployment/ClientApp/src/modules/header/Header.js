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

class Header extends Component {
  render() {
    const { classes, openedSidebar, headerProps, onLeftButtonClick, onRightButtonClick, user, onLogout } = this.props;
    const { leftButtonIconName, rightButtonDisabled, title } = headerProps || {};
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
          <Typography type="title" color="inherit" noWrap className={classes.flex} variant="subtitle1">
            {title}
          </Typography>
          {
            leftButtonIconName == 'Menu' && user?.employeePostId != null && (
              <>
                <Typography type="title" color="inherit" className={classes.mr10} variant="subtitle1">
                  <span>{user.fullName}, {user.post}</span><br />
                  <span>{user.department}</span>
                </Typography>
                <Button className={classNames(classes.whiteColor, classes.mr10)} onClick={onLogout}>
                  Выйти
                </Button>
              </>
            )
          }
          {
            onRightButtonClick &&
            <Button
              className={classNames(classes.menuButton, !rightButtonDisabled && classes.whiteColor)}
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
  onLeftButtonClick: PropTypes.func,
  onRightButtonClick: PropTypes.func,
  user: PropTypes.object,
  onLogout: PropTypes.func
};

export default withStyles(headerStyles)(Header);
