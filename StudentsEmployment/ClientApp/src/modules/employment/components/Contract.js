import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import { Dialog } from '../../dialogs';
import DirectionEdit from './DirectionEdit';


const styles = theme => ({
  button: {
    marginRight: theme.spacing()
  }
});

class Contract extends Component {
  render () {
    const {
      onClose,
      onSave,
      data,
      directionTypes, distributionTypes,
      schoolsSuggestions, onGetSchoolsSuggestions, onClearSchoolsSuggestions, onSchoolSelected, onClearSchoolSelected,
      organizationsSuggestions, onGetOrganizationsSuggestions, onClearOrganizationsSuggestions, onOrganizationSelected, onClearOrganizationSelected,
      onChangeContractDirectionType, classes, pristine, submitting
    } = this.props;
    const { opened, title, tableRow,
      showDirectionSchools, showDirectionOrganizations, showDistributionSchools, showDistributionOrganizations
    } = data;

    return (
      <Dialog
        opened={opened}
        onClose={onClose()}
        title={title}
      >
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
          onChangeDirectionType={onChangeContractDirectionType}
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
          onChangeDirectionType={onChangeContractDirectionType}
        />

        <Button variant="contained" color="primary" className={classes.button} onClick={onSave(tableRow)} disabled={pristine || submitting}>
          Сохранить
        </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={onClose()}>
          Отмена
        </Button>
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

  onChangeContractDirectionType: PropTypes.func
};


export default withStyles(styles)(Contract);
