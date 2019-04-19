import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Field, FieldArray  } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

import { employmentStyles } from './styles';
import { Layout } from '../layout';
import { QuestionDialog } from '../dialogs';

import RenderTextField from '../_global/components/RenderTextField';
import RenderAutocomplete from '../_global/components/RenderAutocomplete';
import RenderDatePicker from '../_global/components/RenderDatePicker';
import RenderList from '../_global/components/RenderList';

import Contract from './components/Contract';
import StudentsSelection from './components/StudentsSelection';
import {AddButton, EditButton, DeleteButton} from './components/GridButtons';


@withStyles(employmentStyles)
class Employment extends Component {
  componentDidMount() {
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

  render() {
    const {
      classes, formName, headerProps,
      confirmSaveEmploymentDailogProps, deleteEmploymentContractDailogProps,
      error, handleSubmit, eduForms,
      specialities, onGetSpecialitySuggestions, onClearSpecialitySuggestions, onClearSpecialitySelectedSuggestion, onSpecialitySelected,
      directionTypes, distributionTypes,
      gridSettingContracts,
      contract, onCloseContract,
      schoolsSuggestions, onGetSchoolsSuggestions, onClearSchoolsSuggestions, onSchoolSelected, onClearSchoolSelected,
      organizationsSuggestions, onGetOrganizationsSuggestions, onClearOrganizationsSuggestions, onOrganizationSelected, onClearOrganizationSelected,
      onChangeContractDirectionType,
      openedStudentsSelection, studentsSelection, onCloseStudentsSelection, onStudentsSelected, onLoadStudents, contractStuffIsEmpty,
      onShowDistributionReport, onShowEmploymentReport,
      profiles
    } = this.props;
    return (
      <Layout
        formName={formName}
        headerProps={headerProps}
      >
        <form onSubmit={handleSubmit} >
          <div className={classes.container}>
            <Field
              name='speciality'
              component={RenderAutocomplete}
              disabled={!contractStuffIsEmpty}
              hideIcon={!contractStuffIsEmpty}
              autoFocus={false}
              label='Специальность/направление'
              placeholder='выберите специальность/направление'
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
              {eduForms && eduForms.map((item, index) => <MenuItem key={index} value={item.id}>{item.name}</MenuItem>)}
            </Field>

            <Field
              name='specializationId'
              disabled={!contractStuffIsEmpty}
              select
              component={RenderTextField}
              label='Образовательная программа'
              placeholder='выберите образовательную программу'
              className={classes.textField}
            >
              {profiles && profiles.map((item, index) => <MenuItem key={index} value={item.id}>{item.name}</MenuItem>)}
            </Field>

            <Field
              disabled={!contractStuffIsEmpty}
              name='docDate'
              component={RenderDatePicker}
              label='Дата документа'
              emptyLabel='Не указана'
              className={classes.date}
            />

            {error && <strong className={classes.error}>{error}</strong>}
          </div>
          {
            contractStuffIsEmpty &&
            <Button className={classNames(classes.marginTop, classes.marginBottom)} color="primary" onClick={onLoadStudents}>
              Загрузить студентов по выбранным выше данным
            </Button>
          }
          {
            !contractStuffIsEmpty &&
            <div className={classNames(classes.marginTop, classes.marginBottom, classes.row)}>
              <Button className={classes.marginRight} color="primary" onClick={onShowDistributionReport}>
                Отчет по распределению
              </Button>
              <Button color="primary" onClick={onShowEmploymentReport}>
                Отчет по трудоустройству
              </Button>
            </div>
          }
          {
            !contractStuffIsEmpty &&
            <FieldArray
              name='pgContractStuffs'
              component={RenderList}
              gridSetting={gridSettingContracts}
              AddButton={AddButton}
              EditButton={EditButton}
              DeleteButton={DeleteButton}
            />
          }
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

        <QuestionDialog dialogProps={confirmSaveEmploymentDailogProps} />
        <QuestionDialog dialogProps={deleteEmploymentContractDailogProps} />
      </Layout>
    );
  }
}

Employment.propTypes = {
  classes: PropTypes.object,
  formName: PropTypes.string,
  headerProps: PropTypes.object,

  onLoadData: PropTypes.func,
  confirmSaveEmploymentDailogProps: PropTypes.object,
  deleteEmploymentContractDailogProps: PropTypes.object,

  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  eduForms: PropTypes.array,

  specialities: PropTypes.array,
  onGetSpecialitySuggestions: PropTypes.func,
  onClearSpecialitySuggestions: PropTypes.func,
  onClearSpecialitySelectedSuggestion: PropTypes.func,
  onSpecialitySelected: PropTypes.func,

  gridSettingContracts: PropTypes.object,

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
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,

  onShowDistributionReport: PropTypes.func,
  onShowEmploymentReport: PropTypes.func,
  profiles: PropTypes.array,
};

export default Employment;
