import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';

const renderSelect = ({
  input,
  meta: { touched, error },
  children,
  label,
  className,
  ...custom
}) => (
  <FormControl error={touched && error} className={className}>
    <InputLabel htmlFor={input.name}>{label}</InputLabel>
    <Select
      input={<Input id={input.name} />}
      autoWidth
      {...input}
      {...custom}
    >
      {children}
    </Select>
    <FormHelperText>{touched && error}</FormHelperText>
  </FormControl>
);

renderSelect.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  children: PropTypes.array,
};

export default renderSelect;
