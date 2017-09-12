import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  PagingState,
} from '@devexpress/dx-react-grid';
import {
  Grid, TableView, TableHeaderRow, PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
// import { withStyles } from 'material-ui/styles';
import Loading from './common/Loading';
import Autocomplete from './common/Autocomplete';

class List extends Component {
  componentWillMount() {
    this.props.onChangeTitle();
    this.props.onLoadData();
  }

  changeCurrentPage = (currentPage) => {
    if (currentPage != this.props.currentPage )
      this.props.onLoadData(currentPage);
  }

  render() {
    const {
      data, columns, pageSize, currentPage, totalCount, loading,
      searchPlaceholder, searchSuggestions, onSuggestionsFetchRequested, onSuggestionsClearRequested, onChangeSearchValue
    } = this.props;
    return (
      <div>
        <Autocomplete
          placeholder={searchPlaceholder}
          suggestions={searchSuggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onChangeValue={onChangeSearchValue}
        />
        <Grid
          rows={data}
          columns={columns}>
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={pageSize}
            totalCount={totalCount}
          />
          <TableView />
          <TableHeaderRow />
          <PagingPanel />
        </Grid>
        {loading && <Loading />}
      </div>
    );
  }
}

List.propTypes = {
  classes: PropTypes.object,
  onChangeTitle: PropTypes.func,
  onLoadData: PropTypes.func,
  data: PropTypes.array,
  columns: PropTypes.array,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  totalCount: PropTypes.number,
  loading: PropTypes.bool,

  searchPlaceholder: PropTypes.object,
  searchSuggestions: PropTypes.array,   //suggestions - должен быть массив объектов типа: { id: <id>, name: <name> }
  onSuggestionsFetchRequested: PropTypes.func,
  onSuggestionsClearRequested: PropTypes.func,
  onChangeSearchValue: PropTypes.func,
};

export default List;
