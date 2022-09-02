import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const renderSelect = ({
  input,
  meta: { error },
  children,
  label,
  className,
  ...custom
}) => {
  return (
    <FormControl error={error} className={className}>
      <InputLabel htmlFor={input.name}>{label}</InputLabel>
      <Select
        input={<Input id={input.name} />}
        autoWidth
        {...input}
        {...custom}
      >
        {children}
      </Select>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

renderSelect.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  children: PropTypes.array,
};

export default renderSelect;
