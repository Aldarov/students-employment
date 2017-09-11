import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  PagingState,
} from '@devexpress/dx-react-grid';
import {
  Grid, TableView, TableHeaderRow, PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  grid: {
  }}
);

class List extends Component {
  componentWillMount() {
    this.props.onChangeTitle();
    this.props.onLoadData(1);
  }

  changeCurrentPage = (currentPage) => {
    this.props.onLoadData(currentPage);
  }

  render() {
    const { classes, data, columns, pageSize, currentPage, totalCount, loading } = this.props;
    return (
      <div className={classes.grid}>
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

export default withStyles(styles)(List);
