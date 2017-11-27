import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import DescriptionIcon from 'material-ui-icons/Description';
import AccountBalanceIcon from 'material-ui-icons/AccountBalance';

import EmploymentListContainer from '../containers/EmploymentListContainer';
import EmploymentContainer from '../containers/EmploymentContainer';
import OrganizationListContainer from '../containers/OrganizationListContainer';
import Header from './Header';
import QuestionDialog from './common/dialogs/QuestionDialog';

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
  componentWillMount(){
    this.props.onLoadData();
  }

  handleRedirectToEmployment = () => {
    this.props.onRedirectToEmployment();
    this.props.onCloseLeftColumn();
  };

  handleRedirectToOrganization = () => {
    this.props.onRedirectToOrganization();
    this.props.onCloseLeftColumn();
  };

  render() {
    const {
      classes, title, onOpenLeftColumn, onCloseLeftColumn, openColumn,
      onReturn, onSave, pristine, submitting,
      dialog, onDialogYes, onDialogNo,
    } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <Header
            classes={classes}
            openColumn={openColumn}
            title={title}
            onOpenLeftColumn={onOpenLeftColumn}
            onReturn={onReturn()}
            onSave={onSave()}
            pristine={pristine}
            submitting={submitting}
          />
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
          <main className={classNames(classes.content, openColumn && classes.contentShift)}>
            <Route exact path="/" component={EmploymentListContainer}/>
            <Route exact path="/employment" component={EmploymentListContainer}/>
            <Route exact path="/employment/:id" component={EmploymentContainer} />
            <Route exact path="/organization" component={OrganizationListContainer}/>
          </main>
          <QuestionDialog
            open={dialog.dialogOpen}
            contentText={dialog.dialogText}
            onYes={onDialogYes}
            onNo={onDialogNo}
          />
        </div>
      </div>
    );
  }
}
Main.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  onRedirectToEmployment: PropTypes.func,
  onRedirectToOrganization: PropTypes.func,
  onLoadData: PropTypes.func,
  onOpenLeftColumn: PropTypes.func,
  onCloseLeftColumn: PropTypes.func,
  openColumn: PropTypes.bool,
  onReturn: PropTypes.func,
  onSave: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  dialog: PropTypes.object,
  onDialogYes: PropTypes.func,
  onDialogNo: PropTypes.func,
};

export default withStyles(styles)(Main);
