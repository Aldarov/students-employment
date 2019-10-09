import { connectAdvanced } from 'react-redux';
import {
  reduxForm, getFormValues,
  submit, isPristine, isSubmitting,
  change, touch, arrayRemove, arrayPush,
  stopAsyncValidation, initialize
} from 'redux-form';
import isEmpty from 'lodash/isEmpty';

import Employment from './Employment';
import { openQuestionDialog, closeQuestionDialog } from '../dialogs';
import {
  initEmploymentForm,
  getSpecialitiesSuggestion, clearSpecialitiesSuggestion,
  openEmploymentContract, closeEmploymentContract,
  getSchoolsSuggestion, clearSchoolsSuggestion,
  getOrganizationsSuggestion, clearOrganizationsSuggestion,
  showDirectionOrganizations, showDistributionOrganizations,
  hideDirectionOrganizations, hideDistributionOrganizations,
  saveEmployment, getHeaderErrors, checkExistHeader
} from './employment.actions';
import {
  getStudentsWithoutSelected, getStudentsByHeader, clearStudentSelection,
  openStudentsSelection, closeStudentsSelection,
} from './students.actions';
import ContractTableCellTemplate from './components/ContractTableCellTemplate';
import { getProfiles, clearProfiles } from '../layout';
import Alert from 'react-s-alert';

const formName = 'employment';
const CONFIRM_SAVE_EMPLOYMENT_DIALOG = 'CONFIRM_SAVE_EMPLOYMENT_DIALOG';
const DELETE_EMPLOYMENT_CONTRACT_DIALOG = 'DELETE_EMPLOYMENT_CONTRACT_DIALOG';
let onRedirectToList;

const getNewContractStuff = (headerId, studentId, student) => {
  let res = {
    studentId: studentId,
    directionTypeId: null,
    distributionTypeId: null,
    directionOrganizationId: null,
    distributionOrganizationId: null,
    directionSchoolId: null,
    distributionSchoolId: null,
    jobOnSpeciality: false,
    directionOrganizationName: null,
    distributionOrganizationName: null,
    directionSchoolName: null,
    distributionSchoolName: null,
    student: student
  };
  if (headerId) {
    res = {
      ...res,
      pgHeaderId: headerId
    };
  }
  return res;
};

const withSelectDirectionSchoolPgTypeIds = [8];
const withSelectDirectionOrganPgTypeIds = [9];
const withSelectDistributionSchoolPgTypeIds = [17, 13, 14, 21, 25, 26];
const withSelectDistributionOrganPgTypeIds = [18];

export default connectAdvanced( dispatch => (state, ownProps) => {
  let id  = ownProps.match.params.id === 'add' ? null : ownProps.match.params.id;
  const formValues = getFormValues(formName)(state);
  const pristine = isPristine(formName)(state);
  const submitting = isSubmitting(formName)(state);
  const pgContractStuffs = formValues ? formValues.pgContractStuffs : [];

  const handleClearSchoolSelected = (row, type) => {
    dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'SchoolName', ''));
    dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'SchoolId', null));
  };

  const handleClearOrganizationSelected = (row, type) => {
    dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'OrganizationName', ''));
    dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'OrganizationId', null));
  };

  const toucheErrorFields = errors => {
    for (var err in errors) {
      if (errors.hasOwnProperty(err)) {
        dispatch(touch(formName, err));
      }
    }
  };

  const getContractTableCellData = (column, row) => {
    const directionType = state.dictionaries.directionTypes.filter((item) => (item.id == row.directionTypeId))[0];
    const distributionType = state.dictionaries.distributionTypes.filter((item) => (item.id == row.distributionTypeId))[0];
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
  };

  const saveData = values => {
    return dispatch(saveEmployment(values, formName,
      (res, err) => {
        console.log('saveData', res, err);
        if (err) {
          Alert.error(err.data);
          throw new SubmissionError({
            _error: err.data
          });
          return;
        }

        if (onRedirectToList) {
          onRedirectToList();
        }
        else {
          dispatch(initialize(formName, values));
          dispatch(change(formName, 'id', res.id));
          ownProps.history.push(`/employment/${res.id}`);
        }
        return res;
      }
    ));
  };

  const props = {
    formName: formName,
    headerProps: {
      onLeftButtonClick: () => {
        if (!pristine) {
          dispatch(openQuestionDialog(CONFIRM_SAVE_EMPLOYMENT_DIALOG));
        } else {
          ownProps.history.push('/employment');
        }
      },
      leftButtonIconName: 'ArrowBack',
      onRightButtonClick: () => dispatch(submit(formName)),
      rightButtonDisabled: pristine || submitting,
      title: id ? 'Трудоустройство выпускников' : 'Трудоустройство выпускников (добавление)'
    },
    confirmSaveEmploymentDailogProps: {
      dialogName: CONFIRM_SAVE_EMPLOYMENT_DIALOG,
      contentText: 'Сохранить измененные данные?',
      onYes: () => {
        onRedirectToList = () => {
          ownProps.history.push('/employment');
          onRedirectToList = null;
        };
        dispatch(closeQuestionDialog(CONFIRM_SAVE_EMPLOYMENT_DIALOG));
        dispatch(submit(formName));
      },
      onNo: () => {
        dispatch(closeQuestionDialog(CONFIRM_SAVE_EMPLOYMENT_DIALOG));
        ownProps.history.push('/employment');
      }
    },
    deleteEmploymentContractDailogProps: {
      dialogName: DELETE_EMPLOYMENT_CONTRACT_DIALOG,
      contentText: 'Удалить данную запись?',
      onYes: args => {
        dispatch(arrayRemove(formName, 'pgContractStuffs', args.tableRow));
        dispatch(closeQuestionDialog(DELETE_EMPLOYMENT_CONTRACT_DIALOG));
      },
      onNo: () => {
        dispatch(closeQuestionDialog(DELETE_EMPLOYMENT_CONTRACT_DIALOG));
      }
    },

    specialities: state.employment.edit.specialitySuggestions,
    eduForms: state.dictionaries.eduForms,
    directionTypes: state.dictionaries.directionTypes,
    distributionTypes: state.dictionaries.distributionTypes,
    profiles: state.dictionaries.profiles,

    gridSettingContracts: {
      columns: [
        { name: 'fullName', title: 'ФИО' },
        { name: 'regAddress', title: 'Адрес регистрации' },
        { name: 'finance', title: 'Финансирование' },
        { name: 'entrType', title: 'Способ поступления' },
        { name: 'phone', title: 'Телефон' },
        { name: 'direction', title: 'Распределен' },
        { name: 'distribution', title: 'Трудоустроен' },
      ],
      defaultColumnWidths: [
        { columnName: 'fullName', width: 250 },
        { columnName: 'regAddress', width: 300 },
        { columnName: 'finance', width: 120 },
        { columnName: 'entrType', width: 150 },
        { columnName: 'phone', width: 150 },
        { columnName: 'direction', width: 250 },
        { columnName: 'distribution', width: 250 }
      ],

      cellComponent: props => ContractTableCellTemplate({...props, getCellData: getContractTableCellData}),
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowSorting: false,

      onDoAction: (args) => {
        switch (args.type) {
          case 'adding': {
            let { entraceYear, eduFormId, specialityId, specializationId } = formValues;
            if (specializationId == 0) specializationId = null;
            const exceptedIds = formValues && formValues.pgContractStuffs &&
              formValues.pgContractStuffs.map( item => item.studentId );
            dispatch(getStudentsWithoutSelected(entraceYear, eduFormId, specialityId, specializationId, exceptedIds, formName))
              .then(() => dispatch(openStudentsSelection()));
            break;
          }
          case 'editing': {
            const { directionTypeId, distributionTypeId } = formValues.pgContractStuffs[args.tableRow];

            const showDirectionSchool = (withSelectDirectionSchoolPgTypeIds.indexOf(directionTypeId) > -1);
            const showDirectionOrganization = (withSelectDirectionOrganPgTypeIds.indexOf(directionTypeId) > -1);
            const showDistributionSchool = (withSelectDistributionSchoolPgTypeIds.indexOf(distributionTypeId) > -1);
            const showDistributionOrganization = (withSelectDistributionOrganPgTypeIds.indexOf(distributionTypeId) > -1);

            dispatch(openEmploymentContract(args.row.student.fullName, args.tableRow,
              showDirectionSchool, showDirectionOrganization,
              showDistributionSchool, showDistributionOrganization, formName
            ));
            break;
          }
          case 'deleting': {
            dispatch(openQuestionDialog(DELETE_EMPLOYMENT_CONTRACT_DIALOG, args));
            break;
          }
        }
      },
    },

    schoolsSuggestions: state.employment.edit.schoolsSuggestions,
    organizationsSuggestions: state.employment.edit.organizationsSuggestions,

    openedStudentsSelection: state.employment.edit.openedStudentsSelection,
    studentsSelection: state.employment.edit.studentsSelection,

    contract: state.employment.edit.currentContract,
    contractStuffIsEmpty: pgContractStuffs.length > 0 ? false : true,
  };

  const methods = {
    onLoadData: () => {
      dispatch(clearStudentSelection());
      dispatch(closeStudentsSelection());
      dispatch(closeEmploymentContract());
      dispatch(initEmploymentForm(id, formName));
    },

    onGetSpecialitySuggestions: value => dispatch(getSpecialitiesSuggestion({ limit: 20, search: value, sorting: [{columnName: 'name'}] }, formName)),
    onClearSpecialitySuggestions: () => dispatch(clearSpecialitiesSuggestion()),
    onClearSpecialitySelectedSuggestion: () => {
      dispatch(change(formName, 'speciality', ''));
      dispatch(change(formName, 'specialityId', null));
      dispatch(change(formName, 'specializationId', 0));
      dispatch(clearProfiles());
    },
    onSpecialitySelected: data => {
      dispatch(change(formName, 'speciality', data.name));
      dispatch(change(formName, 'specialityId', data.id));
      dispatch(change(formName, 'specializationId', null));
      dispatch(getProfiles(data.id, { sorting: [{columnName: 'specialityID'}, {columnName: 'name'}] }));
    },

    onCloseContract: row => () => {
      let error = null;
      if ((withSelectDirectionSchoolPgTypeIds.indexOf(pgContractStuffs[row].directionTypeId) > -1)
          && !pgContractStuffs[row].directionSchoolId) {
        const oldError = error && {...error.pgContractStuffs[row]};
        error = {
          'pgContractStuffs': {
            [row]: {
              ...oldError,
              directionSchoolName: 'Выберите образовательное учреждение'
            }
          }
        };
        dispatch(touch(formName, 'pgContractStuffs['+row+'].directionSchoolName'));
      }

      if ((withSelectDirectionOrganPgTypeIds.indexOf(pgContractStuffs[row].directionTypeId) > -1)
          && !pgContractStuffs[row].directionOrganizationId) {
        const oldError = error && {...error.pgContractStuffs[row]};
        error = {
          'pgContractStuffs': {
            [row]: {
              ...oldError,
              directionOrganizationName: 'Выберите организацию'
            }
          }
        };
        dispatch(touch(formName, 'pgContractStuffs['+row+'].directionOrganizationName'));
      }

      if ((withSelectDistributionSchoolPgTypeIds.indexOf(pgContractStuffs[row].distributionTypeId) > -1)
          && !pgContractStuffs[row].distributionSchoolId) {
        const oldError = error && {...error.pgContractStuffs[row]};
        error = {
          'pgContractStuffs': {
            [row]: {
              ...oldError,
              distributionSchoolName: 'Выберите образовательное учреждение'
            }
          }
        };
        dispatch(touch(formName, 'pgContractStuffs['+row+'].distributionSchoolName'));
      }

      if ((withSelectDistributionOrganPgTypeIds.indexOf(pgContractStuffs[row].distributionTypeId) > -1)
          && !pgContractStuffs[row].distributionOrganizationId) {
        const oldError = error && {...error.pgContractStuffs[row]};
        error = {
          'pgContractStuffs': {
            [row]: {
              ...oldError,
              distributionOrganizationName: 'Выберите организацию'
            }
          }
        };
        dispatch(touch(formName, 'pgContractStuffs['+row+'].distributionOrganizationName'));
      }

      if (error) {
        dispatch(stopAsyncValidation(formName, error));
      } else {
        dispatch(closeEmploymentContract());
      }
    },

    onGetSchoolsSuggestions: value => dispatch(getSchoolsSuggestion({ limit: 20, search: value, sorting: [{columnName: 'name'}] }, formName)),
    onClearSchoolsSuggestions: () => dispatch(clearSchoolsSuggestion()),
    onSchoolSelected: (row, type) => data => {
      dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'SchoolName', data.name));
      dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'SchoolId', data.id));
    },
    onClearSchoolSelected: (row, type) => () => handleClearSchoolSelected(row, type),

    onGetOrganizationsSuggestions: value => dispatch(getOrganizationsSuggestion({ limit: 20, search: value, sorting: [{columnName: 'name'}] }, formName)),
    onClearOrganizationsSuggestions: () => dispatch(clearOrganizationsSuggestion()),
    onOrganizationSelected: (row, type) => data => {
      dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'OrganizationName', data.name));
      dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'OrganizationId', data.id));
    },
    onClearOrganizationSelected: (row, type) => () => handleClearOrganizationSelected(row, type),

    onChangeContractDirectionType: (value, tableRow, directionType) => {
      if ((directionType === 'direction') && (withSelectDirectionSchoolPgTypeIds.indexOf(value) > -1)) {
        dispatch(showDirectionOrganizations('school'));
        handleClearOrganizationSelected(tableRow, directionType);
      } else if ((directionType === 'direction') && (withSelectDirectionOrganPgTypeIds.indexOf(value) > -1)) {
        dispatch(showDirectionOrganizations('organization'));
        handleClearSchoolSelected(tableRow, directionType);
      } else if ((directionType === 'distribution') && (withSelectDistributionSchoolPgTypeIds.indexOf(value) > -1)) {
        dispatch(showDistributionOrganizations('school'));
        handleClearOrganizationSelected(tableRow, directionType);
      } else if ((directionType === 'distribution') && (withSelectDistributionOrganPgTypeIds.indexOf(value) > -1)) {
        dispatch(showDistributionOrganizations('organization'));
        handleClearSchoolSelected(tableRow, directionType);
      } else {
        directionType === 'direction' ? dispatch(hideDirectionOrganizations()) : dispatch(hideDistributionOrganizations());
        handleClearSchoolSelected(tableRow, directionType);
        handleClearOrganizationSelected(tableRow, directionType);
      }
    },
    onCloseStudentsSelection: () => {
      dispatch(clearStudentSelection());
      dispatch(closeStudentsSelection());
    },
    onLoadStudents: async () => {
      const errors = dispatch(getHeaderErrors(formName));

      if (!isEmpty(errors)) {
        toucheErrorFields(errors);
        dispatch(stopAsyncValidation(formName, errors));
      } else {
        const error = await dispatch(checkExistHeader(formName, formValues, (err) => {
          if (err) {
            Alert.error(err);
            return true;
          }
          return false;
        }));
        if (error) return;

        let { entraceYear, eduFormId, specialityId, specializationId } = formValues;
        if (specializationId == 0) specializationId = null;

        const data = await dispatch(getStudentsByHeader(entraceYear, eduFormId, specialityId, specializationId, formName));
        if (data.length > 0)
        {
          const stuff = data.map(item => getNewContractStuff(id, item.studentId, item));
          dispatch(change(formName, 'pgContractStuffs', stuff));
        }
        else {
          Alert.error('По указанным данным не найдено ни одного студента');
        }
      }
    },
    onStudentsSelected: selection => {
      if (Array.isArray(selection) && selection.length > 0) {
        selection.forEach(item => dispatch(arrayPush(formName, 'pgContractStuffs', getNewContractStuff(id, item.studentId, item))));
        dispatch(clearStudentSelection());
        dispatch(closeStudentsSelection());
      }
    },

    onShowDistributionReport: () => {
      const w = window.open();
      saveData(formValues).then(res => w.location = `/reports/distribution/${res.id}`);
    },
    onShowEmploymentReport: () => {
      const w = window.open();
      saveData(formValues).then(res => w.location = `/reports/employment/${res.id}`);
    },
    onSubmit: values => saveData(values),
    validate: values => dispatch(getHeaderErrors(formName, values)),
  };

  return { ...props, ...methods, ...ownProps };
})(
  reduxForm({
    form: formName,
  })(Employment)
);
