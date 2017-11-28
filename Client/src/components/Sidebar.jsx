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
  handleRedirectToEmployment = () => {
    this.props.onRedirectToEmployment();
    this.props.onCloseLeftColumn();
  };

  handleRedirectToOrganization = () => {
    this.props.onRedirectToOrganization();
    this.props.onCloseLeftColumn();
  };

  render () {
    const { openColumn, onCloseLeftColumn, classes } = this.props;

    return (
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        open={openColumn}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={onCloseLeftColumn}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={this.handleRedirectToEmployment}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText inset primary="Трудоустройство" />
            </ListItem>
            <ListItem button onClick={this.handleRedirectToOrganization}>
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
  openColumn: PropTypes.bool,
  onCloseLeftColumn: PropTypes.func,
  classes: PropTypes.object,
  onRedirectToEmployment: PropTypes.func,
  onRedirectToOrganization: PropTypes.func
};

export default Sidebar;
