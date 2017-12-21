import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

import DirectionEdit from './DirectionEdit';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  toolbar: {
    marginLeft: '-20px'
  },
  flex: {
    flex: 1,
  },
  content: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  field: {
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: '300px',
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
  },
  horizontal: {
    display: 'flex',
    flexWrap: 'wrap',
  }
});

class Contract extends Component {
  render () {
    const {
      classes,
      onClose,
      data,
      directionTypes, distributionTypes,
      schoolsSuggestions, onGetSchoolsSuggestions, onClearSchoolsSuggestions, onSchoolSelected, onClearSchoolSelected,
      organizationsSuggestions, onGetOrganizationsSuggestions, onClearOrganizationsSuggestions, onOrganizationSelected, onClearOrganizationSelected,
    } = this.props;
    const { opened, title, tableRow,
      showDirectionSchools, showDirectionOrganizations, showDistributionSchools, showDistributionOrganizations
    } = data;

    return (
      <Dialog
        fullScreen
        open={opened}
        onRequestClose={onClose}
        transition={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton color="contrast" onClick={onClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <DirectionEdit
            tableRow={tableRow}
            directionType='direction'
            showSchool={showDirectionSchools}
            showOrganization={showDirectionOrganizations}
            types={directionTypes}
            schoolsSuggestions={schoolsSuggestions}
            onGetSchoolsSuggestions={onGetSchoolsSuggestions}
            onClearSchoolsSuggestions={onClearSchoolsSuggestions}
            onSchoolSelected={onSchoolSelected}
            onClearSchoolSelected={onClearSchoolSelected}
            organizationsSuggestions={organizationsSuggestions}
            onGetOrganizationsSuggestions={onGetOrganizationsSuggestions}
            onClearOrganizationsSuggestions={onClearOrganizationsSuggestions}
            onOrganizationSelected={onOrganizationSelected}
            onClearOrganizationSelected={onClearOrganizationSelected}
          />
          <DirectionEdit
            tableRow={tableRow}
            directionType='distribution'
            showSchool={showDistributionSchools}
            showOrganization={showDistributionOrganizations}
            types={distributionTypes}
            schoolsSuggestions={schoolsSuggestions}
            onGetSchoolsSuggestions={onGetSchoolsSuggestions}
            onClearSchoolsSuggestions={onClearSchoolsSuggestions}
            onSchoolSelected={onSchoolSelected}
            onClearSchoolSelected={onClearSchoolSelected}
            organizationsSuggestions={organizationsSuggestions}
            onGetOrganizationsSuggestions={onGetOrganizationsSuggestions}
            onClearOrganizationsSuggestions={onClearOrganizationsSuggestions}
            onOrganizationSelected={onOrganizationSelected}
            onClearOrganizationSelected={onClearOrganizationSelected}
          />
        </div>
      </Dialog>
    );
  }
}

Contract.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  onClose: PropTypes.func,

  directionTypes: PropTypes.array,
  distributionTypes: PropTypes.array,

  schoolsSuggestions: PropTypes.array,
  onGetSchoolsSuggestions: PropTypes.func,
  onClearSchoolsSuggestions: PropTypes.func,
  onSchoolSelected: PropTypes.func,
  onClearSchoolSelected: PropTypes.func,

  organizationsSuggestions: PropTypes.array,
  onGetOrganizationsSuggestions: PropTypes.func,
  onClearOrganizationsSuggestions: PropTypes.func,
  onOrganizationSelected: PropTypes.func,
  onClearOrganizationSelected: PropTypes.func,
};

export default withStyles(styles)(Contract);
