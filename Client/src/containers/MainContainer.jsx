import React, { Component } from 'react';
import AuthHOC from './AuthHOC';
import { Route } from 'react-router-dom';
import classNames from 'classnames';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';

import EmploymentListContainer from './EmploymentListContainer';
import EmploymentContainer from './EmploymentContainer';

class MainContainer extends Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="root">
        <div className="appFrame">
          <AppBar className={classNames('appBar', this.state.open && 'appBarShift')}>
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames('menuButton', this.state.open && 'hide')}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                Persistent drawer
              </Typography>
            </Toolbar>
          </AppBar>
          {/* classes={{
              paper: classes.drawerPaper,
            }} */}

          <Drawer
            type="persistent"
            open={this.state.open}
            className="drawerPaper"
          >
            <div className="drawerInner">
              <div className="drawerHeader">
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List className="list">mailFolderListItems</List>
              <Divider />
              <List className="list">otherMailFolderListItems</List>
            </div>
          </Drawer>
          <main className={classNames('content', this.state.open && 'contentShift')}>
            <Typography type="body1" noWrap>
              <Route exact path="/" component={EmploymentListContainer}/>
              <Route exact path="/employment" component={EmploymentListContainer}/>
              <Route path="/employment/:id" component={EmploymentContainer}/>
            </Typography>
          </main>
        </div>
      </div>
    );
  }
}

export default AuthHOC(MainContainer);
