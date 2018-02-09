import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from 'material-ui';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';

export const AddButton = ({ onExecute }) => {
  return (
    // disiabled ? null :
    <div style={{ textAlign: 'center' }}>
      <Button
        color="primary"
        onClick={onExecute}
      >
        Добавить
      </Button>
    </div>
  );
};
AddButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
  disiabled: PropTypes.bool
};

export const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Редактировать">
    <EditIcon />
  </IconButton>
);
EditButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
};

export const DeleteButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Удалить">
    <DeleteIcon />
  </IconButton>
);
DeleteButton.propTypes = {
  onExecute: PropTypes.func.isRequired
};

