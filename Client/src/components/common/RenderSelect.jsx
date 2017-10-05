import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';

const renderSelect = ({
  input,
  meta: { touched, error },
  children,
  classes,
  caption,
  currentValue,
  ...custom
}) => (
  <FormControl className={classes && classes.formControl} error={touched && error}>
    <InputLabel htmlFor={input.name}>{caption}</InputLabel>
    <Select
      value={currentValue || 0}
      input={<Input id={input.name} />}
      onChange={(event) => {
        return input.onChange(event);
      }}
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
  classes: PropTypes.object,
  caption: PropTypes.string.isRequired,
  children: PropTypes.array,
  currentValue: PropTypes.any,
};

export default renderSelect;
