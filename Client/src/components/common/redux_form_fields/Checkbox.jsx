import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';

export default function RenderCheckbox({ input, ...rest }) {
  return <Checkbox
    onCheck={input.onChange}
    {...input}
    {...rest}
  />;
}

RenderCheckbox.propTypes = {
  input: PropTypes.object.isRequired
};
