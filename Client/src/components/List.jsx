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
    const { data, columns, pageSize, currentPage, totalCount, loading } = this.props;
    return (
      <div>
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
};

export default List;
