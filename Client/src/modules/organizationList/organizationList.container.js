import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import OrganizationList from './OrganizationList';
import actions from './actions';


const formName = 'organizationList';

const mapStateToProps = (state) => {
  const { limit, page, totalRecord, sorting } = state.organization.list.info;

  return {
    formName: formName,
    headerProps: {
      leftButtonIconName: 'Menu',
      title: 'Организации'
    },

    data: state.organization.list.data,
    searchSuggestions: state.organization.list.searchSuggestions,

    gridSetting: {
      columns: [
        { name: 'id', title: 'Код' },
        { name: 'name', title: 'Организация' },
        { name: 'address', title: 'Адрес' },
      ],
      defaultColumnWidths: [
        { columnName: 'id', width: 100 },
        { columnName: 'name', width: 500 },
        { columnName: 'address', width: 500 },
      ],

      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowSorting: true,

      sorting: sorting,
      currentPage: page,
      pageSize: limit,
      totalCount: totalRecord,
    }
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { onDoAction, ...rest } = actions;

  return bindActionCreators({
    onDoAction: onDoAction(props.history),
    ...rest
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationList);

export {
  formName
};
