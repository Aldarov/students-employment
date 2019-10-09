import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FieldArray  } from 'redux-form';
import RenderList from '../_global/components/RenderList';
import {AddButton, EditButton, DeleteButton} from './components/GridButtons';

class StudentList extends Component {
  shouldComponentUpdate({ gridSettingContracts }) {
    return gridSettingContracts.lenght !== this.props.gridSettingContracts.lenght;
  }

  render() {
    const { gridSettingContracts } = this.props;

    return (
      <FieldArray
        name='pgContractStuffs'
        component={RenderList}
        gridSetting={gridSettingContracts}
        AddButton={AddButton}
        EditButton={EditButton}
        DeleteButton={DeleteButton}
      />
    );
  }
}

StudentList.propTypes = {
  gridSettingContracts: PropTypes.object
};

export default StudentList;
