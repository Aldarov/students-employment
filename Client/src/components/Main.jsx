import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import EmploymentListContainer from '../containers/EmploymentListContainer';
import EmploymentContainer from '../containers/EmploymentContainer';
import OrganizationListContainer from '../containers/OrganizationListContainer';
import OrganizationContainer from '../containers/OrganizationContainer';
import Header from './Header';
import QuestionDialog from './common/dialogs/QuestionDialog';
import Sidebar from './Sidebar';
import RouteWithProps from './common/RouteWithProps';

const styles = theme => ({
  appFrame: {
    position: 'fixed',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  content: {
    padding: theme.spacing.unit,
    marginTop: 64,
    flex: 1
  },
});

class Main extends Component {
  componentWillMount() {
    this.props.onLoadData();
  }

  childProps = {
    onInitHeader: props => {
      this.headerProps = props;
      this.forceUpdate();
    },
    onInitDialog: props => this.dialogProps = props
  }

  render() {
    const {
      classes, onCloseSidebar, openedSidebar, onRedirect, dialogOpen
    } = this.props;

    return (
      <div className={classes.appFrame}>
        <Header
          openedSidebar={openedSidebar}
          headerProps={this.headerProps}
        />
        <Sidebar
          open={openedSidebar}
          onClose={onCloseSidebar}
          onRedirect={onRedirect}
        />
        <main className={classes.content}>
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
          <RouteWithProps exact path="/organization/:id"
            component={OrganizationContainer}
            componentProps={this.childProps}
          />
        </main>
        <QuestionDialog
          open={dialogOpen}
          dialogProps={this.dialogProps}
        />
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
