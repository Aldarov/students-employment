import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from 'material-ui';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';

export const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: 'center' }}>
    <Button
      color="primary"
      onClick={onExecute}
    >
      Создать
    </Button>
  </div>
);
AddButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
};

export const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Редактировать документ">
    <EditIcon />
  </IconButton>
);
EditButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
};

export const DeleteButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Удалить документ">
    <DeleteIcon />
  </IconButton>
);
DeleteButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
};

