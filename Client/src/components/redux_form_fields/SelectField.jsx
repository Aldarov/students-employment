import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';

export default function RenderSelectField ({ input, label, meta: { touched, error }, ...rest }) {
  return <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    {...rest}
  />;
}

RenderSelectField .propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object.isRequired
};
