import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import DescriptionIcon from 'material-ui-icons/Description';
import AccountBalanceIcon from 'material-ui-icons/AccountBalance';

import EmploymentListContainer from '../containers/EmploymentListContainer';
import EmploymentContainer from '../containers/EmploymentContainer';
import OrganizationListContainer from '../containers/OrganizationListContainer';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: 'auto',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    height: 56,
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
  },
  content: {
    width: '100%',
    marginLeft: -drawerWidth,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      content: {
        height: 'calc(100% - 64px)',
        marginTop: 64,
      },
    },
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

class Main extends Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleRedirectToEmployment = () => {
    const { push } = this.props.history;
    push('employment');
  };

  handleRedirectToOrganization = () => {
    const { push } = this.props.history;
    push('organization');
  };

  render() {
    const { classes, title } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            type="persistent"
            classes={{
              paper: classes.drawerPaper,
            }}
            open={this.state.open}
          >
            <div className={classes.drawerInner}>
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List className={classes.list}>
                <ListItem button onClick={this.handleRedirectToEmployment}>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Трудоустройство" />
                </ListItem>
                <ListItem button onClick={this.handleRedirectToOrganization.bind(this)}>
                  <ListItemIcon>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Организации" />
                </ListItem>
              </List>
            </div>
          </Drawer>
          <main className={classNames(classes.content, this.state.open && classes.contentShift)}>
            <Route exact path="/" component={EmploymentListContainer}/>
            <Route exact path="/employment" component={EmploymentListContainer}/>
            <Route path="/employment/:id" component={EmploymentContainer}/>
            <Route exact path="/organization" component={OrganizationListContainer}/>
          </main>
        </div>
      </div>
    );
  }
}
Main.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  history: PropTypes.object,
};

export default withStyles(styles)(Main);
