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
    eduForms: state.dictionaries.eduForms,
    students: (state.form.employment.values && state.form.employment.values.students) || [],
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

  // {
  //   '0': {
  //     id: 9482,
  //     studentId: 19801,
  //     pgHeaderId: 7,
  //     directionTypeId: 1,
  //     directionOrganizationId: null,
  //     distributionTypeId: 11,
  //     distributionOrganizationId: null,
  //     directionSchoolId: null,
  //     distributionSchoolId: null,
  //     jobOnSpeciality: null,
  //     directionType: {
  //       id: 1,
  //       name: 'Уход за ребенком',
  //       pgKindId: 1
  //     },
  //     distributionType: {
  //       id: 11,
  //       name: 'Не трудоустроен (не состоит на учете в центрах занятости)',
  //       pgKindId: 2
  //     },
  //     directionOrganization: null,
  //     distributionOrganization: null,
  //     directionSchool: null,
  //     distributionSchool: null,
  //     student: {
  //       studentId: 19801,
  //       fullName: 'Цыренова Стелла Алексеевна',
  //       regAddress: 'Россия, Бурятия Респ, Окинский р-н, с. Орлик, ул. Телевизионная, д. 33, кв. 2',
  //       financeId: 2,
  //       finance: 'договор',
  //       entrTypeId: 1,
  //       entrType: 'общие основания',
  //       phone: '',
  //       stateId: 2,
  //       state: 'окончил',
  //       specialityId: 93,
  //       educationFormId: 1,
  //       entranceYear: 2009
  //     }
  //   }
  // }

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
