import { connectAdvanced } from 'react-redux';
import { SubmissionError } from 'redux-form';

import Employment from '../components/Employment';
import {
  changeTitle, getEmploymentById, setEmploymentById,
  getSpecialitiesSuggestion, clearSpecialitiesSuggestion, clearSpecialitySelectedSuggestion, specialitySelected
} from '../actions';

// const getStudents = (pgContractStuffs) => {
//   return pgContractStuffs.map((item) => {
//     return {
//       fullName: item.students.fullName,
//       regAddress: item.students.regAddress,
//       finance: item.students.,
//       entrType: 150,
//       phone: 100,
//       direction: 300,
//       distribution: 300
//     };
//   });
// };

export default connectAdvanced( dispatch => (state, ownProps) => {
  const { id } = ownProps.match.params;

  const props = {
    loading: state.fetching,
    initialValues: state.form.employment.initialValues,
    specialities: state.employment.edit.specialitySuggestions,
    eduForms: state.dictionaries.eduForms,
    students: state.form.employment.students || [],
    columnsStudents: [
      { name: 'fullName', title: 'ФИО' },
      { name: 'regAddress', title: 'Адрес регистрации' },
      { name: 'finance', title: 'Финансирование' },
      { name: 'entrType', title: 'Способ поступления' },
      { name: 'phone', title: 'Телефон' },
      { name: 'direction', title: 'Распределен' },
      { name: 'distribution', title: 'Трудоустроен' },
    ],
    listColumnWidthsStudents: { fullName: 200, regAddress: 300, finance: 100, entrType: 150, phone: 100, direction: 300, distribution: 300 }
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

  // students: PropTypes.array,
  // columnsStudents: PropTypes.array,
  // listColumnWidthsStudents: PropTypes.object,
  // onDoActionStudents: PropTypes.func,

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
