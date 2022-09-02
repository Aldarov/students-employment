import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

export default function renderTextField ({
  input,
  meta: { touched, error },
  children,
  ...custom
}) {
  return (
    <TextField
      error={touched && Boolean(error)}
      helperText={touched && error}
      {...input}
      {...custom}
    >
      {children}
    </TextField>
  );
}

renderTextField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  children: PropTypes.array,
};
