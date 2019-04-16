import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import IconButton from '@material-ui/core/IconButton';
import DescriptionIcon from '@material-ui/icons/Description';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import { sidebarStyles } from './styles';

@withStyles(sidebarStyles)
class Sidebar extends Component {
  render () {
    const { classes, open, onClose, onRedirect } = this.props;

    return (
      <Drawer open={open} onClose={onClose}>
        <div
          tabIndex={0}
          role='button'
          onClick={onClose}
          onKeyDown={onClose}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={onClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List className={classes.list}>
            <ListItem button onClick={onRedirect('/employment')}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText inset primary="Трудоустройство" />
            </ListItem>
            <ListItem button onClick={onRedirect('/organization')}>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText inset primary="Организации" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    );
  }
}

Sidebar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.object,
  onRedirect: PropTypes.func,
};

export default Sidebar;
