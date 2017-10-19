import { connectAdvanced } from 'react-redux';
import { SubmissionError } from 'redux-form';

import Employment from '../components/Employment';
import {
  changeTitle, getEmploymentById, setEmploymentById,
  getSpecialitiesSuggestion, clearSpecialitiesSuggestion, clearSpecialitySelectedSuggestion, specialitySelected
} from '../actions';

export default connectAdvanced( dispatch => (state, ownProps) => {
  const { id } = ownProps.match.params;

  const props = {
    loading: state.fetching,
    initialValues: state.form.employment.initialValues,
    specialities: state.employment.edit.specialitySuggestions,
    eduForms: state.dictionaries.eduForms
  };

  const methods = {
    onLoadData: () => dispatch(getEmploymentById(id)),
    onSetData: data => dispatch(setEmploymentById(data)),
    onChangeTitle: () => dispatch(changeTitle(`Трудоустройство № ${id}`)),

    onGetSpecialitySuggestions: (value) => dispatch(getSpecialitiesSuggestion({ limit: 7, search: value, sorting: [{columnName: 'name'}] })),
    onClearSpecialitySuggestions: () => dispatch(clearSpecialitiesSuggestion()),
    onClearSpecialitySelectedSuggestion: () => dispatch(clearSpecialitySelectedSuggestion()),
    onSpecialitySelected: (data) => dispatch(specialitySelected(data)),
    onSubmit: (values) => {
      console.log('onSubmit', values);
      throw new SubmissionError({
        entraceYear: 'Ошибка заполнения',
        _error: 'Общая ошибка формы!!'
      });
    },
    validate: (values) => {
      const errors = {};
      const requiredFields = [ 'entraceYear', 'docDate' ];
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
