import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import List from './common/List';
import Autocomplete from './common/Autocomplete';
import Loading from './common/Loading';

const styles = theme => ({
  autocomplete: {
    width: '75%',
    margin: theme.spacing.unit,
  }
});

class EmploymentList extends Component {
  state = {
    searchValue: ''
  };

  componentWillMount() {
    this.props.onChangeTitle();
    this.props.onLoadData();
  }

  handleClearSuggestionSelected = () => {
    this.setState({ searchValue: '' });
    this.props.onClearSuggestionSelected();
  }

  handleChangeSearchValue = (event) => {
    this.setState({ searchValue: event.target ? event.target.value : '' });
  }

  render() {
    const {
      searchSuggestions, onSuggestionsFetchRequested,
      onSuggestionsClearRequested, onSuggestionSelected, onClearSuggestionSelected,
      onChangePage, onChangeSorting, onDoAction,
      listColumnWidths, data, columns, pageSize, currentPage, totalCount, loading, sorting, classes
    } = this.props;

    return (
      <div>
        <Autocomplete
          inputProps={{
            autoFocus: false,
            label: 'Поиск',
            placeholder: 'Для поиска введите значения через пробел',
            className: classes.autocomplete
          }}
          suggestions={searchSuggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionSelected}
          onClearSelectedSuggestion={onClearSuggestionSelected}
        />

        <List
          data={data}
          columns={columns}
          pageSize={pageSize}
          currentPage={currentPage}
          totalCount={totalCount}
          changeCurrentPage={onChangePage}
          allowSorting
          sorting={sorting}
          changeSorting={onChangeSorting}
          allowAdding
          allowEditing
          allowDeleting
          doAction={onDoAction}
          defaultColumnWidths={listColumnWidths}
        />
        {loading && <Loading />}
      </div>
    );
  }
}

EmploymentList.propTypes = {
  classes: PropTypes.object,
  onChangeTitle: PropTypes.func,
  onLoadData: PropTypes.func,

  data: PropTypes.array,
  columns: PropTypes.array,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  totalCount: PropTypes.number,
  sorting: PropTypes.array,
  listColumnWidths: PropTypes.object,

  loading: PropTypes.bool,

  searchSuggestions: PropTypes.array,   //suggestions - должен быть массив объектов типа: { id: <id>, name: <name> }
  onSuggestionsFetchRequested: PropTypes.func,
  onSuggestionsClearRequested: PropTypes.func,
  onSuggestionSelected: PropTypes.func,
  onChangeSorting: PropTypes.func,
  onChangePage: PropTypes.func,
  onClearSuggestionSelected: PropTypes.func,
  onDoAction: PropTypes.func,
};

export default withStyles(styles)(EmploymentList);
