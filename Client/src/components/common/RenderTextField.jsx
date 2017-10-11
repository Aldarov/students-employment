import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

export default function renderTextField ({
  input,
  meta: { touched, error },
  ...custom
}) {
  console.log({...custom}, {...input});
  return (
    <TextField
      error={touched && error}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  );
}

renderTextField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  children: PropTypes.array,
};
