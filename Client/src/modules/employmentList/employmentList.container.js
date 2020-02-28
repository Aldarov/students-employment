import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EmploymentList from './EmploymentList';
import actions from './actions';

const formName = 'employmentList';

const mapStateToProps = (state) => {
  const { limit, page, totalRecord, sorting } = state.employment.list.info;

  return {
    formName: formName,

    headerProps: {
      leftButtonIconName: 'Menu',
      title: 'Трудоустройство'
    },

    data: state.employment.list.data,
    searchSuggestions: state.employment.list.searchSuggestions,

    gridSetting: {
      columns: [
        { name: 'id', title: 'Код' },
        { name: 'faculty', title: 'Факультет' },
        { name: 'speciality', title: 'Специальность' },
        { name: 'entranceYear', title: 'Год поступления' },
        { name: 'eduForm', title: 'Форма обучения' },
        { name: 'group', title: 'Группа' },
        { name: 'specialization', title: 'Образовательная программа' },
      ],
      defaultColumnWidths: [
        { columnName: 'id', width: 100 },
        { columnName: 'faculty', width: 100 },
        { columnName: 'speciality', width: 400 },
        { columnName: 'entranceYear', width: 170 },
        { columnName: 'eduForm', width: 170 },
        { columnName: 'group', width: 120 },
        { columnName: 'specialization', width: 500 },
      ],

      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,

      allowSorting: true,
      sorting: sorting,

      currentPage: page,
      pageSize: limit,
      totalCount: totalRecord,
    },
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { onDoAction, ...rest } = actions;

  return bindActionCreators({
    onDoAction: onDoAction(props.history),
    ...rest
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EmploymentList);

export {
  formName
};
