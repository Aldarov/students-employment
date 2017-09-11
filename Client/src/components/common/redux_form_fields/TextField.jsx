import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
// import {mapProps} from './mapError';

export const RenderTextField = ({meta: {touched, error}, input, ...rest}) => {
  return <TextField
    errorText={touched && error}
    {...input}
    {...rest}
  />;
};

// export const RenderTextField = (...rest) => {
//   return <TextField
//     {...mapProps(...rest)}
//   />;
// };

RenderTextField.propTypes = {
  meta: PropTypes.object,
  input:PropTypes.object
};
