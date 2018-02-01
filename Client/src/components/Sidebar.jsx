import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import IconButton from 'material-ui/IconButton';
import DescriptionIcon from 'material-ui-icons/Description';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import AccountBalanceIcon from 'material-ui-icons/AccountBalance';

const styles = () => ({
  list: {
    width: 240,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    height: 64,
  },
});

class Sidebar extends Component {
  render () {
    const { classes, open, onClose, onRedirect } = this.props;

    return (
      <Drawer open={open} onClose={onClose}>
        <div
          tabIndex={0}
          role="button"
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

export default withStyles(styles)(Sidebar);
