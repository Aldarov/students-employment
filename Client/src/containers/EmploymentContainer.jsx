import { connectAdvanced } from 'react-redux';
import _ from 'lodash';
import {
  SubmissionError, reduxForm, getFormValues,
  submit, isPristine, isSubmitting, change, arrayRemove, arrayPush,
  stopAsyncValidation, touch
} from 'redux-form';

import Employment from '../components/Employment';
import {
  initEmploymentForm,
  getSpecialitiesSuggestion, clearSpecialitiesSuggestion,
  openQuestionDialog, closeQuestionDialog,
  openEmploymentContract, closeEmploymentContract,
  getSchoolsSuggestion, clearSchoolsSuggestion,
  getOrganizationsSuggestion, clearOrganizationsSuggestion,
  showDirectionOrganizations, showDistributionOrganizations,
  hideDirectionOrganizations, hideDistributionOrganizations,
  saveEmployment,
  getStudentsWithoutSelected, getStudentsByHeader, clearStudentSelection,
  openStudentsSelection, closeStudentsSelection
} from '../actions';

const formName = 'employment';
let successSubmit;

const initHeader = (dispatch, ownProps, pristine, submitting, title) => {
  ownProps.onInitHeader({
    onLeftButtonClick: () => {
      if (!pristine) {
        ownProps.onInitDialog({
          contentText: 'Сохранить измененные данные?',
          onYes: () => {
            successSubmit = () => {
              ownProps.history.push('/employment');
              successSubmit = null;
            };
            dispatch(closeQuestionDialog());
            dispatch(submit(formName));
          },
          onNo: () => {
            dispatch(closeQuestionDialog());
            ownProps.history.push('/employment');
          }
        });
        dispatch(openQuestionDialog());
      } else {
        ownProps.history.push('/employment');
      }
    },
    leftButtonIconName: 'ArrowBack',
    onRightButtonClick: () => dispatch(submit(formName)),
    rightButtonDisabled: pristine || submitting,
    title: title
  });
};

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

const getHeaderErrors = values => {
  const errors = {};

  const requiredFields = [ 'specialityId', 'entraceYear', 'docDate', 'eduFormId' ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      if (field == 'specialityId') {
        errors['speciality'] = 'Заполните данное поле';
      } else {
        errors[field] = 'Заполните данное поле';
      }
    }
  });

  if (values.entraceYear && isNaN(Number(values.entraceYear))) {
    errors.entraceYear = 'Год должен быть числом';
  }

  // if (values.pgContractStuffs && values.pgContractStuffs.length == 0) {
  //   errors['_error'] = 'Пожалуйста, загрузите студентов';
  // }
  return errors;
};

export default connectAdvanced( dispatch => (state, ownProps) => {
  const id  = ownProps.match.params.id === 'add' ? null : ownProps.match.params.id;
  const formValues = getFormValues(formName)(state);
  const pristine = isPristine(formName)(state);
  const submitting = isSubmitting(formName)(state);
  const title = id ? 'Трудоустройство выпускников' : 'Трудоустройство выпускников (добавление)';
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

  const props = {
    loading: state.fetching,
    specialities: state.employment.edit.specialitySuggestions,
    eduForms: state.dictionaries.eduForms,

    directionTypes: state.dictionaries.directionTypes,
    distributionTypes: state.dictionaries.distributionTypes,
    columnsStudents: [
      { name: 'fullName', title: 'ФИО' },
      { name: 'regAddress', title: 'Адрес регистрации' },
      { name: 'finance', title: 'Финансирование' },
      { name: 'entrType', title: 'Способ поступления' },
      { name: 'phone', title: 'Телефон' },
      { name: 'direction', title: 'Распределен' },
      { name: 'distribution', title: 'Трудоустроен' },
    ],
    listColumnWidthsStudents: { fullName: 250, regAddress: 300, finance: 120, entrType: 150, phone: 150, direction: 250, distribution: 250 },
    contract: state.employment.edit.currentContract,
    schoolsSuggestions: state.employment.edit.schoolsSuggestions,
    organizationsSuggestions: state.employment.edit.organizationsSuggestions,
    openedStudentsSelection: state.employment.edit.openedStudentsSelection,
    studentsSelection: state.employment.edit.studentsSelection,
    contractStuffIsEmpty: pgContractStuffs.length > 0 ? false : true
  };

  const methods = {
    onLoadData: () => {
      dispatch(clearStudentSelection());
      dispatch(closeStudentsSelection());
      dispatch(closeEmploymentContract());
      dispatch(initEmploymentForm(formName, id));
      initHeader(dispatch, ownProps, pristine, submitting, title);
    },

    onGetSpecialitySuggestions: value => dispatch(getSpecialitiesSuggestion({ limit: 7, search: value, sorting: [{columnName: 'name'}] })),
    onClearSpecialitySuggestions: () => dispatch(clearSpecialitiesSuggestion()),
    onClearSpecialitySelectedSuggestion: () => {
      dispatch(change(formName, 'speciality', ''));
      dispatch(change(formName, 'specialityId', null));
    },
    onSpecialitySelected: data => {
      dispatch(change(formName, 'speciality', data.name));
      dispatch(change(formName, 'specialityId', data.id));
    },

    onCloseContract: row => () => {
      let error = null;
      if (pgContractStuffs[row].directionTypeId == 8 && !pgContractStuffs[row].directionSchoolId) {
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
      if (pgContractStuffs[row].directionTypeId == 9 && !pgContractStuffs[row].directionOrganizationId) {
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
      if (pgContractStuffs[row].distributionTypeId == 17 && !pgContractStuffs[row].distributionSchoolId) {
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
      if (pgContractStuffs[row].distributionTypeId == 18 && !pgContractStuffs[row].distributionOrganizationId) {
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

    onGetSchoolsSuggestions: value => dispatch(getSchoolsSuggestion({ limit: 7, search: value, sorting: [{columnName: 'name'}] })),
    onClearSchoolsSuggestions: () => dispatch(clearSchoolsSuggestion()),
    onSchoolSelected: (row, type) => data => {
      dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'SchoolName', data.name));
      dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'SchoolId', data.id));
    },
    onClearSchoolSelected: (row, type) => () => handleClearSchoolSelected(row, type),

    onGetOrganizationsSuggestions: value => dispatch(getOrganizationsSuggestion({ limit: 7, search: value, sorting: [{columnName: 'name'}] })),
    onClearOrganizationsSuggestions: () => dispatch(clearOrganizationsSuggestion()),
    onOrganizationSelected: (row, type) => data => {
      dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'OrganizationName', data.name));
      dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'OrganizationId', data.id));
    },
    onClearOrganizationSelected: (row, type) => () => handleClearOrganizationSelected(row, type),

    onChangeContractDirectionType: (value, tableRow, directionType) => {
      let schoolTypeId;
      let organizationTypeId;
      if (directionType === 'direction') {
        schoolTypeId = 8;
        organizationTypeId = 9;
      } else {
        schoolTypeId = 17;
        organizationTypeId = 18;
      }

      if (value === schoolTypeId) {
        directionType === 'direction' ?
          dispatch(showDirectionOrganizations('school')) :
          dispatch(showDistributionOrganizations('school'));
        handleClearOrganizationSelected(tableRow, directionType);
      } else if (value === organizationTypeId) {
        directionType === 'direction' ?
          dispatch(showDirectionOrganizations('organization')) :
          dispatch(showDistributionOrganizations('organization'));
        handleClearSchoolSelected(tableRow, directionType);
      } else {
        directionType === 'direction' ?
          dispatch(hideDirectionOrganizations()) :
          dispatch(hideDistributionOrganizations());
        handleClearSchoolSelected(tableRow, directionType);
        handleClearOrganizationSelected(tableRow, directionType);
      }
    },
    onCloseStudentsSelection: () => {
      dispatch(clearStudentSelection());
      dispatch(closeStudentsSelection());
    },

    onLoadStudents: () => {
      const errors = getHeaderErrors(formValues);

      if (!_.isEmpty(errors)) {
        toucheErrorFields(errors);
        dispatch(stopAsyncValidation(formName, errors));
      } else {
        const { entraceYear, eduFormId, specialityId } = formValues;
        dispatch(getStudentsByHeader(entraceYear, eduFormId, specialityId,
          data => data.forEach(item => dispatch(arrayPush(formName, 'pgContractStuffs', getNewContractStuff(id, item.studentId, item))))
        ));
      }
    },
    onStudentsSelected: selection => {
      if (Array.isArray(selection) && selection.length > 0) {
        selection.forEach(item => dispatch(arrayPush(formName, 'pgContractStuffs', getNewContractStuff(id, item.studentId, item))));
        dispatch(clearStudentSelection());
        dispatch(closeStudentsSelection());
      }
    },

    onDoActionStudents: (args) => {
      switch (args.type) {
        case 'adding': {
          const { entraceYear, eduFormId, specialityId } = formValues;
          const exceptedIds = formValues && formValues.pgContractStuffs &&
            formValues.pgContractStuffs.map( item => item.studentId );
          dispatch(getStudentsWithoutSelected(entraceYear, eduFormId, specialityId, exceptedIds));
          dispatch(openStudentsSelection());
          break;
        }
        case 'editing': {
          const { directionTypeId, distributionTypeId } = formValues.pgContractStuffs[args.tableRow];

          const showDirectionSchool = (directionTypeId === 8);
          const showDirectionOrganization = (directionTypeId === 9);
          const showDistributionSchool = (distributionTypeId === 17);
          const showDistributionOrganization = (distributionTypeId === 18);

          dispatch(openEmploymentContract(args.row.student.fullName, args.tableRow,
            showDirectionSchool, showDirectionOrganization,
            showDistributionSchool, showDistributionOrganization
          ));
          break;
        }
        case 'deleting': {
          ownProps.onInitDialog({
            contentText: 'Удалить данную запись?',
            onYes: () => {
              dispatch(arrayRemove(formName, 'pgContractStuffs', args.tableRow));
              dispatch(closeQuestionDialog());
            },
            onNo: () => {
              dispatch(closeQuestionDialog());
            }
          });
          dispatch(openQuestionDialog());
          break;
        }
      }
    },
    onChange: () => {
      initHeader(dispatch, ownProps, pristine, submitting, title);
    },
    onSubmit: values => {
      dispatch(saveEmployment(values, () => {
        successSubmit && successSubmit();
      }));
      // throw new SubmissionError({
      //   entraceYear: 'Ошибка заполнения',
      //   _error: 'Общая ошибка формы!!'
      // });
    },
    validate: values => getHeaderErrors(values),
  };

  return { ...props, ...methods, ...ownProps };
})(
  reduxForm({
    form: formName,
  })(Employment)
);
