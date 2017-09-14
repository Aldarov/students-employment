import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from './common/List';
import Autocomplete from './common/Autocomplete';
import Loading from './common/Loading';

export default class EmploymentList extends Component {
  state = { sorting: [] }

  componentWillMount() {
    this.props.onChangeTitle();
    this.props.onLoadData({ sorting: this.state.sorting });
  }

  changeCurrentPage = (currentPage) => {
    if (currentPage != this.props.currentPage )
      this.props.onLoadData({ page: currentPage, sorting: this.state.sorting });
  }

  handleClearSelectSuggestion = () => {
    this.props.onSuggestionsClearRequested();
    this.props.onLoadData({ sorting: this.state.sorting });
  }

  changeSorting = (sorting) => {
    this.setState({ sorting: sorting });
    this.props.onLoadData({ page: this.props.currentPage, sorting });
  }

  commitChanges = () => {

  }

  render() {
    const {
      searchPlaceholder, searchSuggestions, onSuggestionsFetchRequested, onSuggestionsClearRequested, onSuggestionSelected,
      data, columns, pageSize, currentPage, totalCount, loading,
    } = this.props;

    return (
      <div>
        <Autocomplete
          placeholder={searchPlaceholder}
          suggestions={searchSuggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionSelected}
          onClearSelectSuggestion={this.handleClearSelectSuggestion}
        />
        <List
          data={data}
          columns={columns}
          pageSize={pageSize}
          currentPage={currentPage}
          totalCount={totalCount}
          changeCurrentPage={this.changeCurrentPage}
          allowSorting
          sorting={this.state.sorting}
          changeSorting={this.changeSorting}
          allowAdding
          allowEditing
          allowDeleting
          commitChanges={this.commitChanges}
        />
        {loading && <Loading />}
      </div>
    );
  }
}

EmploymentList.propTypes = {
  onChangeTitle: PropTypes.func,
  onLoadData: PropTypes.func,

  data: PropTypes.array,
  columns: PropTypes.array,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  totalCount: PropTypes.number,

  loading: PropTypes.bool,

  searchPlaceholder: PropTypes.string,
  searchSuggestions: PropTypes.array,   //suggestions - должен быть массив объектов типа: { id: <id>, name: <name> }
  onSuggestionsFetchRequested: PropTypes.func,
  onSuggestionsClearRequested: PropTypes.func,
  onSuggestionSelected: PropTypes.func,
};
