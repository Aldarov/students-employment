import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function renderCheckbox ({
  input,
  label,
  className,
  ...custom
}) {
  const handleChange = (event, value) => {
    input.onChange(value);
    input.onBlur();
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={handleChange}
          {...custom}
        />
      }
      className={className}
      label={label}
    />
  );
}

renderCheckbox.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  className: PropTypes.string
};
