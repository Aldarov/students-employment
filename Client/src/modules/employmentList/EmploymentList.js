import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { Layout } from '../layout';
import { QuestionDialog } from '../dialogs';
import { employmentListStyles } from './styles';
import List from '../_global/components/List';
import Autocomplete from '../_global/components/Autocomplete';
import { AddButton, EditButton, DeleteButton } from './components/Buttons';
import { DELETE_EMPLOYMENT_DIALOG } from './actions';


@withStyles(employmentListStyles)
class EmploymentList extends Component {
  componentDidMount() {
    this.props.onLoadData();
  }

  render() {
    const {
      classes,
      formName,

      headerProps,
      onHeaderLeftButtonClick,

      onDelEmploymentYes, onDelEmploymentNo,

      data,
      gridSetting,

      searchSuggestions,
      onSuggestionsFetchRequested, onSuggestionsClearRequested,
      onSuggestionSelected, onClearSuggestionSelected,

      onSortingChange,
      onChangeCurrentPage,
      onDoAction
    } = this.props;

    return (
      <Layout
        formName={formName}
        headerProps={headerProps}
        onHeaderLeftButtonClick={onHeaderLeftButtonClick}
      >
        <Autocomplete
          inputProps={{
            autoFocus: false,
            className: classes.autocomplete,
            label: 'Поиск',
            placeholder: 'Введите значения через пробел',
          }}
          suggestions={searchSuggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionSelected}
          onClearSelectedSuggestion={onClearSuggestionSelected}
        />
        <List
          data={data}
          gridSetting={gridSetting}
          AddButton={AddButton}
          EditButton={EditButton}
          DeleteButton={DeleteButton}

          onSortingChange={onSortingChange}
          onChangeCurrentPage={onChangeCurrentPage}
          onDoAction={onDoAction}
        />
        <QuestionDialog
          dialogName={DELETE_EMPLOYMENT_DIALOG}
          contentText='Удалить данную запись?'
          onYes={onDelEmploymentYes}
          onNo={onDelEmploymentNo}
        />
      </Layout>
    );
  }
}

EmploymentList.propTypes = {
  classes: PropTypes.object,
  formName: PropTypes.string,
  headerProps: PropTypes.object,
  onHeaderLeftButtonClick: PropTypes.func,

  onDelEmploymentYes: PropTypes.func,
  onDelEmploymentNo: PropTypes.func,

  onLoadData: PropTypes.func,
  data: PropTypes.array,
  gridSetting: PropTypes.object,
  onSortingChange: PropTypes.func,
  onChangeCurrentPage: PropTypes.func,
  onDoAction: PropTypes.func,

  //suggestions - должен быть массив объектов типа: { id: <id>, name: <name> }
  searchSuggestions: PropTypes.array,
  onSuggestionsFetchRequested: PropTypes.func,
  onSuggestionsClearRequested: PropTypes.func,
  onSuggestionSelected: PropTypes.func,
  onClearSuggestionSelected: PropTypes.func,
};

export default EmploymentList;
