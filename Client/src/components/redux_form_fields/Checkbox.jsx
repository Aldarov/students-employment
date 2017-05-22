import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';

export default function RenderCheckbox({ input, label, ...rest }) {
  return <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
    {...rest}
  />;
}

RenderCheckbox.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
};
