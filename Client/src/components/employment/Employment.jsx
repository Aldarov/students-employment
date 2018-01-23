import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray  } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';

import Loading from '../common/Loading';
import RenderTextField from '../common/RenderTextField';
import RenderAutocomplete from '../common/RenderAutocomplete';
import RenderDatePicker from '../common/RenderDatePicker';
import RenderList from '../common/RenderList';
import ListTableCellTemplate from '../common/ListTableCellTemplate';

import DirectionEdit from './DirectionEdit';
import Contract from './Contract';
import StudentsSelection from './StudentsSelection';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing.unit,
  },
  autocomplete: {
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 600,
    },
  },
  textField: {
    marginTop: theme.spacing.unit*2,
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
  },
  error: {
    margin: theme.spacing.unit,
    color: 'red',
    fontWeight: 600,
    display: 'block'
  },
  marginBottom: {
    marginBottom: theme.spacing.unit,
  },
});

class Employment extends Component {
  componentWillMount() {
    this.props.onLoadData();
  }

  getCellData = (column, row) => {
    const directionType = this.props.directionTypes.filter((item) => (item.id == row.directionTypeId))[0];
    const distributionType = this.props.distributionTypes.filter((item) => (item.id == row.distributionTypeId))[0];
    switch (column.name) {
      case 'fullName': return (row.student && row.student.fullName);
      case 'regAddress': return (row.student && row.student.regAddress);
      case 'finance': return (row.student && row.student.finance);
      case 'entrType': return (row.student && row.student.entrType);
      case 'phone': return (row.student && row.student.phone);
      case 'direction':
        return (
          directionType && directionType.name +
          (row.directionOrganizationName ? ', ' + row.directionOrganizationName : '') +
          (row.directionSchoolName ? ', ' + row.directionSchoolName : '')
        ) || '';
      case 'distribution':
        return (
          distributionType && distributionType.name +
          (row.distributionOrganizationName ? ', ' + row.distributionOrganizationName : '') +
          (row.distributionSchoolName ? ', ' + row.distributionSchoolName : '')
        ) || '';
      default:
        break;
    }
  }

  studentEditCellTemplate = (args) => {
    const { style, column, row, tableRow: {rowId} } = args;
    return (
      <ListTableCellTemplate
        column={column}
        style={{...style}}
      >
        {
          column.name == 'direction'
            ?
            <DirectionEdit
              tableRow={rowId}
              directionTypes={this.props.directionTypes}
            />
            :
            column.name == 'distribution' ? '' : this.getCellData(column, row)
        }
      </ListTableCellTemplate>
    );
  };

  studentTableCellTemplate = (args) => {
    const { column, row, style } = args;
    return (
      <ListTableCellTemplate
        style={{...style}}
        column={column}
      >
        {this.getCellData(column, row)}
      </ListTableCellTemplate>
    );
  };

  render() {
    const {
      classes, error, loading, handleSubmit, eduForms,
      specialities, onGetSpecialitySuggestions, onClearSpecialitySuggestions, onClearSpecialitySelectedSuggestion, onSpecialitySelected,
      directionTypes, distributionTypes,
      gridSettingContracts,
      contract, onCloseContract,
      schoolsSuggestions, onGetSchoolsSuggestions, onClearSchoolsSuggestions, onSchoolSelected, onClearSchoolSelected,
      organizationsSuggestions, onGetOrganizationsSuggestions, onClearOrganizationsSuggestions, onOrganizationSelected, onClearOrganizationSelected,
      onChangeContractDirectionType,
      openedStudentsSelection, studentsSelection, onCloseStudentsSelection, onStudentsSelected, onLoadStudents, contractStuffIsEmpty
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit} >
          <div className={classes.container}>
            <Field
              name='speciality'
              component={RenderAutocomplete}
              disabled={!contractStuffIsEmpty}
              autoFocus={false}
              label='Специальность'
              placeholder='выберите специальность'
              className={classes.autocomplete}

              suggestions={specialities}
              onSuggestionsFetchRequested={onGetSpecialitySuggestions}
              onSuggestionsClearRequested={onClearSpecialitySuggestions}
              onSuggestionSelected={onSpecialitySelected}
              onClearSelectedSuggestion={onClearSpecialitySelectedSuggestion}
            />

            <Field
              name='entraceYear'
              disabled={!contractStuffIsEmpty}
              component={RenderTextField}
              label='Год начала обучения'
              placeholder='введите год начала обучения'
              className={classes.textField}
            />

            <Field
              name='eduFormId'
              disabled={!contractStuffIsEmpty}
              select
              component={RenderTextField}
              label='Форма обучения'
              placeholder='выберите форму обучения'
              className={classes.textField}
            >
              {eduForms && eduForms.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
            </Field>

            <Field
              disabled={!contractStuffIsEmpty}
              name='docDate'
              component={RenderDatePicker}
              floatingLabelText='Дата документа'
              hintText="Дата документа"
            />

            {error && <strong className={classes.error}>{error}</strong>}
          </div>
          {
            contractStuffIsEmpty && !loading &&
            <Button className={classes.marginBottom} raised color="primary" onClick={onLoadStudents}>
              Загрузить студентов по выбранным выше данным
            </Button>
          }
          <FieldArray
            name='pgContractStuffs'
            component={RenderList}
            gridSetting={gridSettingContracts}
            // AddButton={AddButton}
            // EditButton={EditButton}
            // DeleteButton={DeleteButton}

            // columns={columnsStudents}
            // defaultColumnWidths={listColumnWidthsStudents}
            // allowAdding
            // allowEditing
            // allowDeleting
            // doAction={onDoActionStudents}
            // tableCellTemplate={this.studentTableCellTemplate}
          />
        </form>

        { contract &&
        <Contract
          data={contract}
          open={contract.opened}
          title={contract.title}
          tableRow={contract.tableRow}
          onClose={onCloseContract}
          directionTypes={directionTypes}
          distributionTypes={distributionTypes}

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

          onChangeContractDirectionType={onChangeContractDirectionType}
        />
        }
        <StudentsSelection
          title={'Добавление студентов'}
          data={studentsSelection}
          onClose={onCloseStudentsSelection}
          opened={openedStudentsSelection}
          columns={gridSettingContracts.columns}
          defaultColumnWidths={gridSettingContracts.defaultColumnWidths}
          onSelected={onStudentsSelected}
        />
        {loading && <Loading />}
      </div>
    );
  }
}

Employment.propTypes = {
  classes: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool,
  onLoadData: PropTypes.func,
  onSetData: PropTypes.func,
  onChangeTitle: PropTypes.func,
  handleSubmit: PropTypes.func,
  eduForms: PropTypes.array,

  specialities: PropTypes.array,
  onGetSpecialitySuggestions: PropTypes.func,
  onClearSpecialitySuggestions: PropTypes.func,
  onClearSpecialitySelectedSuggestion: PropTypes.func,
  onSpecialitySelected: PropTypes.func,

  gridSettingContracts: PropTypes.object,
  // columnsStudents: PropTypes.array,
  // listColumnWidthsStudents: PropTypes.object,
  // onDoActionStudents: PropTypes.func,

  directionTypes: PropTypes.array,
  distributionTypes: PropTypes.array,

  contract: PropTypes.object,
  onCloseContract: PropTypes.func,

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

  onChangeContractDirectionType: PropTypes.func,

  studentsSelection: PropTypes.array,
  openedStudentsSelection: PropTypes.bool,
  onCloseStudentsSelection: PropTypes.func,
  onStudentsSelected: PropTypes.func,
  onLoadStudents: PropTypes.func,
  contractStuffIsEmpty: PropTypes.bool,
};

export default withStyles(styles)(Employment);
