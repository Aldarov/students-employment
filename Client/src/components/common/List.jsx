import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  IconButton,
} from 'material-ui';

import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import SaveIcon from 'material-ui-icons/Save';
import CancelIcon from 'material-ui-icons/Cancel';

import {
  PagingState, SortingState, EditingState
} from '@devexpress/dx-react-grid';
import {
  Grid, TableView, TableHeaderRow, PagingPanel, TableEditColumn
} from '@devexpress/dx-react-grid-material-ui';


class List extends Component {
  state = {
    editingRows: [],
    addedRows: [],
    deletedRows: {},
  };

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
    commit: onClick => (
      <IconButton onClick={onClick}>
        <SaveIcon />
      </IconButton>
    ),
    cancel: onClick => (
      <IconButton color="accent" onClick={onClick}>
        <CancelIcon />
      </IconButton>
    ),
  };

  onEditingRowsChange = editingRows => {
    console.log(editingRows);
    this.setState({ editingRows });
  };
  onAddedRowsChange = addedRows => {
    console.log(addedRows);
    this.setState({ addedRows });
  };
  onDeletedRowsChange = deletedRows => {
    console.log(deletedRows);
    this.setState({ deletedRows });
  }

  render() {
    const {
      data, columns, pageSize, currentPage, totalCount, changeCurrentPage,
      allowSorting, sorting, changeSorting,
      allowAdding, allowEditing, allowDeleting, commitChanges
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
          <SortingState
            sorting={sorting}
            onSortingChange={changeSorting}
          />
          <EditingState
            onEditingRowsChange={this.onEditingRowsChange}
            onAddedRowsChange={this.onAddedRowsChange}
            onDeletedRowsChange={this.onDeletedRowsChange}
            onCommitChanges={commitChanges}
          />
          <TableView />
          <TableHeaderRow allowSorting={allowSorting} />
          <PagingPanel />
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
                    console.log(id);
                    executeCommand = (arg) => {
                      console.log(arg);
                    };
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
  allowSorting: PropTypes.bool,
  sorting: PropTypes.array,
  changeSorting: PropTypes.func,
  allowAdding: PropTypes.bool,
  allowEditing: PropTypes.bool,
  allowDeleting: PropTypes.bool,
  commitChanges: PropTypes.func,
};

export default List;
