import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import IconButton from 'material-ui/IconButton';
import DescriptionIcon from 'material-ui-icons/Description';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import AccountBalanceIcon from 'material-ui-icons/AccountBalance';

class Sidebar extends Component {
  render () {
    const { open, onClose, classes, onRedirect } = this.props;

    return (
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        open={open}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={onClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
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
