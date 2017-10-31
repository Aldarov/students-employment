import { connectAdvanced } from 'react-redux';
import { SubmissionError } from 'redux-form';

import Employment from '../components/Employment';
import {
  changeTitle, getEmploymentById, setEmploymentById,
  getSpecialitiesSuggestion, clearSpecialitiesSuggestion, clearSpecialitySelectedSuggestion, specialitySelected,
} from '../actions';

export default connectAdvanced( dispatch => (state, ownProps) => {
  const { id } = ownProps.match.params;

  const props = {
    loading: state.fetching,
    initialValues: state.form.employment.initialValues,
    values: state.form.employment.values,
    specialities: state.employment.edit.specialitySuggestions,
    eduForms: state.dictionaries.eduForms,

    students: state.form.employment.values && state.form.employment.values.pgContractStuffs || [],
    // (state.form.employment.values && state.form.employment.values.students) || [],

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
    onLoadData: () => dispatch(getEmploymentById(id)),
    onSetData: data => dispatch(setEmploymentById(data)),
    onChangeTitle: () => dispatch(changeTitle(`Трудоустройство № ${id}`)),

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
})(Employment);
