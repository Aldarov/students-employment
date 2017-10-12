import { connectAdvanced } from 'react-redux';
import { SubmissionError } from 'redux-form';

import Employment from '../components/Employment';
import {
  changeTitle, getEmploymentById, setEmploymentById,
  getSpecialitiesSuggestion, clearSpecialitiesSuggestion
} from '../actions';

export default connectAdvanced( dispatch => (state, ownProps) => {
  const { id } = ownProps.match.params;

  const props = {
    loading: state.fetching,
    data: state.employment.edit.data,
    initialValues: state.employment.edit.data,
    specilities: state.employment.edit.specialitySuggestions
  };

  const methods = {
    onLoadData: () => dispatch(getEmploymentById(id)),
    onSetData: data => dispatch(setEmploymentById(data)),
    onChangeTitle: () => dispatch(changeTitle(`Трудоустройство № ${id}`)),
    onGetSpecilitySuggestions: (value) => dispatch(getSpecialitiesSuggestion({ limit: 7, search: value, sorting: [{columnName: 'name'}] })),
    onClearSpecilitySuggestions: () => dispatch(clearSpecialitiesSuggestion()),
    onSubmit: (values) => {
      console.log('onSubmit', values);
      throw new SubmissionError({
        entraceYear: 'Ошибка заполнения',
        _error: 'Общая ошибка формы!!'
      });
    },
    validate: (values) => {
      const errors = {};
      const requiredFields = [ 'entraceYear' ];
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
