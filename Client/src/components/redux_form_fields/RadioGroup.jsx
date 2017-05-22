import React from 'react';
import PropTypes from 'prop-types';
import { RadioButtonGroup } from 'material-ui/RadioButton';

export default function RenderRadioGroup ({ input,  ...rest }) {
  return <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />;
}

RenderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired
};
