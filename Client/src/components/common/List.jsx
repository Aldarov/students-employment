import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  PagingState,
} from '@devexpress/dx-react-grid';
import {
  Grid, TableView, TableHeaderRow, PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';

class List extends Component {
  render() {
    const {
      data, columns, pageSize, currentPage, totalCount, changeCurrentPage
    } = this.props;
    return (
      <div>
        <Grid
          rows={data}
          columns={columns}>
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={changeCurrentPage}
            pageSize={pageSize}
            totalCount={totalCount}
          />
          <TableView />
          <TableHeaderRow />
          <PagingPanel />
        </Grid>
      </div>
    );
  }
}

List.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  totalCount: PropTypes.number,
  changeCurrentPage: PropTypes.func,
};

export default List;
