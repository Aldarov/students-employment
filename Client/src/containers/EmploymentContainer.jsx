import { connectAdvanced } from 'react-redux';
import {
  SubmissionError, reduxForm, getFormValues, submit, isPristine, isSubmitting, change, arrayRemove,
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
  saveEmployment
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

export default connectAdvanced( dispatch => (state, ownProps) => {
  const { id } = ownProps.match.params;
  const formValues = getFormValues(formName)(state);
  const pristine = isPristine(formName)(state);
  const submitting = isSubmitting(formName)(state);
  const title = `Документ № ${id}`;

  const handleClearSchoolSelected = (row, type) => {
    dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'SchoolName', ''));
    dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'SchoolId', null));
  };

  const handleClearOrganizationSelected = (row, type) => {
    dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'OrganizationName', ''));
    dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'OrganizationId', null));
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
    organizationsSuggestions: state.employment.edit.organizationsSuggestions
  };

  const methods = {
    onLoadData: () => {
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

    onCloseContract: () => dispatch(closeEmploymentContract()),

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

    onDoActionStudents: (args) => {
      switch (args.type) {
        case 'adding': {
          dispatch(openEmploymentContract('Добавление', null, false, false, false, false));
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
    validate: values => {
      const errors = {};
      const requiredFields = [ 'entraceYear', 'docDate', 'speciality' ];
      requiredFields.forEach(field => {
        if (!values[field]) {
          errors[field] = 'Заполните данное поле';
        }
      });

      return errors;
    }
  };

  return { ...props, ...methods, ...ownProps };
})(
  reduxForm({
    form: formName,
  })(Employment)
);
