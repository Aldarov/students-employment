import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';

import RenderList from '../../_global/components/RenderList';
import {AddButton, EditButton, DeleteButton} from './GridButtons';
import ContractTableCellTemplate from './ContractTableCellTemplate';


const cellComponentCreate = (directionTypes, distributionTypes) => ContractTableCellTemplate(directionTypes, distributionTypes);

class StudentList extends Component {
  cellComponent = cellComponentCreate(this.props.directionTypes, this.props.distributionTypes);

  render() {
    const { gridSettingContracts, onDoAction } = this.props;

    return (
      <FieldArray
        name='pgContractStuffs'
        component={RenderList}
        gridSetting={gridSettingContracts}
        cellComponent={this.cellComponent}
        onDoAction={onDoAction}
        AddButton={AddButton}
        EditButton={EditButton}
        DeleteButton={DeleteButton}
      />
    );
  }
}

StudentList.propTypes = {
  gridSettingContracts: PropTypes.object,
  onDoAction: PropTypes.func,
  directionTypes: PropTypes.array,
  distributionTypes: PropTypes.array,
};

export default StudentList;
