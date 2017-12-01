import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import EmploymentListContainer from '../containers/EmploymentListContainer';
import EmploymentContainer from '../containers/EmploymentContainer';
import OrganizationListContainer from '../containers/OrganizationListContainer';
import Header from './Header';
import QuestionDialog from './common/dialogs/QuestionDialog';
import Sidebar from './Sidebar';
import RouteWithProps from './common/RouteWithProps';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
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
    position: 'fixed',
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
  flex: {
    flex: 1,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    height: 48,
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
  },
  content: {
    width: '100%',
    flexGrow: 1,
    padding: theme.spacing.unit,
    marginTop: 48,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64
    },
  },
  contentShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

class Main extends Component {
  componentWillMount() {
    this.props.onLoadData();
  }

  childProps = {
    onInitHeader: props => this.headerProps = props,
    onInitDialog: props => this.dialogProps = props
  }

  render() {
    const {
      classes, onCloseSidebar, openedSidebar, onRedirect, dialogOpen
    } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <Header
            classes={classes}
            openedSidebar={openedSidebar}
            headerProps={this.headerProps}
          />
          <Sidebar
            classes={classes}
            open={openedSidebar}
            onClose={onCloseSidebar}
            onRedirect={onRedirect}
          />
          <main className={classNames(classes.content, openedSidebar && classes.contentShift)}>
            <RouteWithProps exact path="/"
              component={EmploymentListContainer}
              componentProps={this.childProps}
            />
            <RouteWithProps exact path="/employment"
              component={EmploymentListContainer}
              componentProps={this.childProps}
            />
            <RouteWithProps exact path="/employment/:id"
              component={EmploymentContainer}
              componentProps={this.childProps}
            />
            <RouteWithProps exact path="/organization"
              component={OrganizationListContainer}
              componentProps={this.childProps}
            />
          </main>
          <QuestionDialog
            open={dialogOpen}
            dialogProps={this.dialogProps}
          />
        </div>
      </div>
    );
  }
}
Main.propTypes = {
  classes: PropTypes.object.isRequired,
  onRedirect: PropTypes.func,
  onLoadData: PropTypes.func,
  onCloseSidebar: PropTypes.func,
  openedSidebar: PropTypes.bool,

  dialogOpen: PropTypes.bool,
};

export default withStyles(styles)(Main);
