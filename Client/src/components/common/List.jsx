import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  PagingState, CustomPaging,
  SortingState, SelectionState,
  EditingState, TableColumnResizing,
  IntegratedSorting, IntegratedSelection
} from '@devexpress/dx-react-grid';
import {
  Grid, Table, TableHeaderRow, TableEditColumn, TableEditRow,
  PagingPanel, TableSelection
} from '@devexpress/dx-react-grid-material-ui';

const tableMessages = {
  noData: 'Нет данных',
};

const pagingPanelMessages = {
  showAll: 'Показать все',
  rowsPerPage: 'Кол-во записей на странице',
  info: '{from}-{to} из {count}',
};

class List extends Component {
  commandComponents = {
    add: this.props.AddButton,
    edit: this.props.EditButton,
    delete: this.props.DeleteButton,
    commit: this.props.CommitButton,
    cancel: this.props.CancelButton,
  };

  Command = ({ id, onExecute }) => {
    const CommandButton = this.commandComponents[id];
    return (
      <CommandButton
        onExecute={onExecute}
      />
    );
  };

  handleEditingRowsChange = editingRows => {
    const tableRow = editingRows[editingRows.length-1];
    this.props.gridSetting.onDoAction({ type: 'editing', tableRow, row: this.props.data[tableRow] });
  };

  handleAddedRowsChange = () => {
    this.props.gridSetting.onDoAction({ type: 'adding' });
  };

  handleCommitChanges = ({deleted}) => {
    if (deleted) {
      const tableRow = deleted[deleted.length-1];
      this.props.gridSetting.onDoAction({ type: 'deleting', tableRow, row: this.props.data[tableRow] });
    }
  }

  render() {
    const {
      data,
      className,
      gridSetting: {
        columns,
        defaultColumnWidths,

        allowAdding, allowEditing, allowDeleting,
        currentPage, pageSize, totalCount, onChangeCurrentPage,
        allowSorting, sorting, onSortingChange,

        enableSelectionState, onSelectionChange,
        tableColumnExtensions,
      }
    } = this.props;

    return (
      <div className={className}>
        <Grid
          rows={data || []}
          columns={columns}
        >
          <Table
            columnExtensions={tableColumnExtensions}
            messages={tableMessages}
          />
          <SortingState
            sorting={sorting}
            onSortingChange={onSortingChange}
          />
          <IntegratedSorting />

          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={onChangeCurrentPage}
            pageSize={pageSize}
          />
          <CustomPaging
            totalCount={totalCount}
          />
          {
            totalCount &&
            <PagingPanel
              messages={pagingPanelMessages}
            />
          }

          <TableColumnResizing
            columnWidths={defaultColumnWidths}
          />

          <TableHeaderRow
            showSortingControls={allowSorting}
          />

          {
            enableSelectionState &&
            <Fragment>
              <SelectionState
                key={SelectionState}
                onSelectionChange={onSelectionChange}
              />
              <TableSelection
                key={TableSelection}
                showSelectAll
              />
              <IntegratedSelection
                key={IntegratedSelection}
              />
            </Fragment>
          }

          <EditingState
            editingRowIds={[]}
            addedRows={[]}

            onEditingRowIdsChange={this.handleEditingRowsChange}
            onAddedRowsChange={this.handleAddedRowsChange}
            onCommitChanges={this.handleCommitChanges}
          />
          <TableEditRow />
          <TableEditColumn
            showAddCommand={allowAdding}
            showEditCommand={allowEditing}
            showDeleteCommand={allowDeleting}
            commandComponent={this.Command}
          />
        </Grid>
      </div>
    );
  }
}

List.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
  gridSetting: PropTypes.object.isRequired,

  AddButton: PropTypes.any,
  EditButton: PropTypes.any,
  DeleteButton: PropTypes.any,
  CommitButton: PropTypes.any,
  CancelButton: PropTypes.any,
};

export default List;
