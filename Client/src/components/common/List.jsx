import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from 'material-ui';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import {
  PagingState, SortingState, EditingState, TableColumnResizing, RowDetailState,
} from '@devexpress/dx-react-grid';
import {
  Grid, TableView, TableHeaderRow, TableEditRow, TableEditColumn, PagingPanel, TableRowDetail
} from '@devexpress/dx-react-grid-material-ui';

class List extends Component {
  commandTemplates = {
    add: (onClick, allowAdding) => (
      <div style={{ textAlign: 'center' }}>
        <Button
          color="primary"
          onClick={onClick}
          disabled={!allowAdding}
        >
          Создать
        </Button>
      </div>
    ),
    edit: onClick => (
      <IconButton onClick={onClick}>
        <EditIcon />
      </IconButton>
    ),
    delete: onClick => (
      <IconButton onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    ),
  };

  onEditingRowsChange = editingRows => {
    this.props.doAction({ type: 'editing', row: this.props.data[editingRows[editingRows.length-1]] });
  };

  onAddedRowsChange = () => {
    this.props.doAction({ type: 'adding' });
  };

  onCommitChanges = ({deleted}) => {
    if (deleted) {
      this.props.doAction({ type: 'deleting', row: this.props.data[deleted[deleted.length-1]] });
    }
  }

  render() {
    const {
      data, columns, pageSize, currentPage, totalCount, changeCurrentPage,
      allowSorting, sorting, changeSorting,
      allowAdding, allowEditing, allowDeleting, defaultColumnWidths,
      editCellTemplate, tableCellTemplate, className
    } = this.props;
    return (
      <div className={className}>
        <Grid
          rows={data}
          columns={columns}
        >
          <SortingState
            sorting={sorting}
            onSortingChange={changeSorting}
          />
          <EditingState
            onEditingRowsChange={this.onEditingRowsChange}
            onAddedRowsChange={this.onAddedRowsChange}
            onCommitChanges={this.onCommitChanges}
          />
          {
            tableCellTemplate ?
              <TableView tableCellTemplate={tableCellTemplate}/> :
              <TableView/>
          }
          <TableColumnResizing defaultColumnWidths={defaultColumnWidths}/>
          <TableHeaderRow allowSorting={allowSorting} allowResizing/>
          {
            editCellTemplate &&
            <TableEditRow
              editCellTemplate={editCellTemplate}
            />
          }
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={changeCurrentPage}
            pageSize={pageSize}
            totalCount={totalCount}
          />
          { totalCount && <PagingPanel /> }
          { (allowAdding || allowEditing || allowDeleting) &&
            <TableEditColumn
              allowAdding={allowAdding}
              allowEditing={allowEditing}
              allowDeleting={allowDeleting}
              commandTemplate={({executeCommand, id }) => {
                const template = this.commandTemplates[id];
                if (template) {
                  const allowAdding = true;
                  const onClick = (e) => {
                    executeCommand();
                    e.stopPropagation();
                  };
                  return template(
                    onClick,
                    allowAdding,
                  );
                }
                return undefined;
              }}
            />
          }
          {/* <RowDetailState
            expandedRows={[0]}
          />
          <TableRowDetail
            template={this.rowTemplate}
          /> */}
        </Grid>
      </div>
    );
  }
}

List.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  defaultColumnWidths: PropTypes.object,

  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  totalCount: PropTypes.number,
  changeCurrentPage: PropTypes.func,

  allowSorting: PropTypes.bool,
  sorting: PropTypes.array,
  changeSorting: PropTypes.func,

  allowAdding: PropTypes.bool,
  allowEditing: PropTypes.bool,
  allowDeleting: PropTypes.bool,
  doAction: PropTypes.func,

  editCellTemplate: PropTypes.func,
  tableCellTemplate: PropTypes.func,
  className: PropTypes.string,
};

export default List;
