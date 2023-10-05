import { connect } from 'react-redux';
import {
  reduxForm,
  getFormValues,
  isPristine,
  isSubmitting,
} from 'redux-form';
import { bindActionCreators, compose } from 'redux';

import Employment from './Employment';
import actions from './actions';
import withParams from '../_global/hoc/withParams';
import withRouter from '../_global/hoc/withRouter';

const formName = 'employment';
const withSelectDirectionSchoolPgTypeIds = [8];
const withSelectDirectionOrganPgTypeIds = [9];
const withSelectDistributionSchoolPgTypeIds = [17, 13, 14, 21, 25, 26];
const withSelectDistributionOrganPgTypeIds = [18];

const getId = (props) => props.params.id === 'add' ? null : props.params.id;

const mapStateToProps = (state, ownProps) => {
  const id  = getId(ownProps);
  const formValues = getFormValues(formName)(state);
  const pristine = isPristine(formName)(state);
  const submitting = isSubmitting(formName)(state);
  const pgContractStuffs = formValues ? formValues.pgContractStuffs : [];

  return {
    formName: formName,

    headerProps: {
      leftButtonIconName: 'ArrowBack',
      rightButtonDisabled: pristine || submitting,
      title: id ? 'Трудоустройство выпускников' : 'Трудоустройство выпускников (добавление)'
    },

    specialities: state.employment.edit.specialitySuggestions,
    eduForms: state.dictionaries.eduForms,
    directionTypes: state.dictionaries.directionTypes,
    distributionTypes: state.dictionaries.distributionTypes,
    profiles: state.dictionaries.profiles,
    groups: state.dictionaries.groups,

    gridSettingContracts: {
      columns: [
        { name: 'fullName', title: 'ФИО' },
        { name: 'regAddress', title: 'Адрес регистрации' },
        { name: 'finance', title: 'Финансирование' },
        { name: 'state', title: 'Состояние' },
        { name: 'entrType', title: 'Способ поступления' },
        { name: 'phone', title: 'Телефон' },
        { name: 'direction', title: 'Распределен' },
        { name: 'distribution', title: 'Трудоустроен' },
      ],
      defaultColumnWidths: [
        { columnName: 'fullName', width: 250 },
        { columnName: 'regAddress', width: 300 },
        { columnName: 'finance', width: 120 },
        { columnName: 'state', width: 120 },
        { columnName: 'entrType', width: 150 },
        { columnName: 'phone', width: 150 },
        { columnName: 'direction', width: 250 },
        { columnName: 'distribution', width: 250 }
      ],
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowSorting: false
    },

    schoolsSuggestions: state.employment.edit.schoolsSuggestions,
    organizationsSuggestions: state.employment.edit.organizationsSuggestions,

    openedStudentsSelection: state.employment.edit.openedStudentsSelection,
    studentsSelection: state.employment.edit.studentsSelection,

    contract: state.employment.edit.currentContract,
    contractStuffIsEmpty: pgContractStuffs.length > 0 ? false : true,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  let id  = getId(props);

  const {
    onEmploymentLoadData,
    onCancel,
    onLoadStudents,
    onStudentsSelected,
    onShowDistributionReport,
    onShowEmploymentReport,
    saveData,
    onSaveYes,
    onSaveNo,
    ...rest
  } = actions;

  return bindActionCreators({
    onLoadData: onEmploymentLoadData(id),
    onCancel: onCancel(props.navigate),
    onLoadStudents: onLoadStudents(id),
    onStudentsSelected: onStudentsSelected(id),
    onShowDistributionReport: onShowDistributionReport(props.navigate, id),
    onShowEmploymentReport: onShowEmploymentReport(props.navigate, id),
    onSubmit: saveData(props.navigate),
    onSaveYes: onSaveYes(props.navigate),
    onSaveNo: onSaveNo(props.navigate),
    ...rest
  }, dispatch);
};

export default compose(
  withRouter,
  withParams,
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({form: formName})
)(Employment);

export {
  formName,
  withSelectDirectionSchoolPgTypeIds,
  withSelectDirectionOrganPgTypeIds,
  withSelectDistributionSchoolPgTypeIds,
  withSelectDistributionOrganPgTypeIds
};
