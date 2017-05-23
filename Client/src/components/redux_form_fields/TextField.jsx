import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

export const RenderTextField = ({meta: {touched, error}, input, ...custom}) => {
  return <TextField
    errorText={touched && error}
    {...input}
    {...custom}
  />;
};

RenderTextField.propTypes = {
  meta: PropTypes.object,
  input:PropTypes.object
};
