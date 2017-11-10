import { connectAdvanced } from 'react-redux';
import { SubmissionError, reduxForm, getFormValues } from 'redux-form';

import Employment from '../components/Employment';
import {
  changeTitle, initEmploymentForm,
  getSpecialitiesSuggestion, clearSpecialitiesSuggestion, clearSpecialitySelectedSuggestion, specialitySelected,
} from '../actions';

const formName = 'employment';

export default connectAdvanced( dispatch => (state, ownProps) => {
  const { id } = ownProps.match.params;
  const formValues = getFormValues(formName)(state);

  const props = {
    loading: state.fetching,
    specialities: state.employment.edit.specialitySuggestions,
    eduForms: state.dictionaries.eduForms,

    students: formValues && formValues.pgContractStuffs,
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
    listColumnWidthsStudents: { fullName: 250, regAddress: 300, finance: 120, entrType: 150, phone: 150, direction: 250, distribution: 250 }
  };

  const methods = {
    onLoadData: () => dispatch(initEmploymentForm(formName, id)),
    onChangeTitle: () => dispatch(changeTitle(`Трудоустройство № ${id}`, formName)),

    onGetSpecialitySuggestions: (value) => dispatch(getSpecialitiesSuggestion({ limit: 7, search: value, sorting: [{columnName: 'name'}] })),
    onClearSpecialitySuggestions: () => dispatch(clearSpecialitiesSuggestion()),
    onClearSpecialitySelectedSuggestion: () => dispatch(clearSpecialitySelectedSuggestion()),
    onSpecialitySelected: (data) => dispatch(specialitySelected(data)),
    onDoActionStudents: (args) => {
      console.log('onDoActionStudents', args);
      switch (args.type) {
        case 'adding': {
          break;
        }
        case 'editing': {

          break;
        }
        case 'deleting': {

          break;
        }
        default: break;
      }
    },
    onSubmit: (values) => {
      console.log('onSubmit', values);
      throw new SubmissionError({
        entraceYear: 'Ошибка заполнения',
        _error: 'Общая ошибка формы!!'
      });
    },
    validate: (values) => {
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
    form: formName
  })(Employment)
);
