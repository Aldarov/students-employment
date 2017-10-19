import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import List from './common/List';
import Autocomplete from './common/Autocomplete';
import Loading from './common/Loading';

const styles = () => ({
  autocomplete: {
    width: '75%'
  }
});

class EmploymentList extends Component {
  componentWillMount() {
    this.props.onChangeTitle();
    this.props.onLoadData();
  }

  handleClearSuggestionSelected = () => {
    this.props.onClearSuggestionSelected();
  }

  render() {
    const {
      searchPlaceholder, searchSuggestions, onSuggestionsFetchRequested,
      onSuggestionsClearRequested, onSuggestionSelected,
      onChangePage, onChangeSorting, onDoAction,
      listColumnWidths, data, columns, pageSize, currentPage, totalCount, loading, sorting, classes
    } = this.props;

    return (
      <div>
        {/* <Autocomplete
          style={classes.autocomplete}
          placeholder={searchPlaceholder}
          suggestions={searchSuggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionSelected}
          onClearSelectedSuggestion={this.handleClearSuggestionSelected}
        /> */}
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

  searchPlaceholder: PropTypes.string,
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
