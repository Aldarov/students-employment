import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

export default function renderTextField ({
  input,
  meta: { touched, error },
  ...custom
}) {
  return (
    <TextField
      error={touched && Boolean(error)}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  );
}

renderTextField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};
