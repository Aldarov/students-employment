import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '../../dialogs';
import DirectionEdit from './DirectionEdit';

class Contract extends Component {
  render () {
    const {
      onClose,
      data,
      directionTypes, distributionTypes,
      schoolsSuggestions, onGetSchoolsSuggestions, onClearSchoolsSuggestions, onSchoolSelected, onClearSchoolSelected,
      organizationsSuggestions, onGetOrganizationsSuggestions, onClearOrganizationsSuggestions, onOrganizationSelected, onClearOrganizationSelected,
      onChangeContractDirectionType,
    } = this.props;
    const { opened, title, tableRow,
      showDirectionSchools, showDirectionOrganizations, showDistributionSchools, showDistributionOrganizations
    } = data;

    console.log('contract', data);

    return (
      <Dialog
        opened={opened}
        onClose={onClose(tableRow)}
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

export default Contract;
