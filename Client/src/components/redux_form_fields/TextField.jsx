import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

export default function RenderTextField({ input, label, meta: { touched, error }, ...rest }) {
  return <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...rest}
  />;
}

RenderTextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object
};
