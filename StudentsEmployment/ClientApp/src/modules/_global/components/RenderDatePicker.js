import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { KeyboardDatePicker } from "@material-ui/pickers"
import moment from 'moment';

export default class renderDatePicker extends Component {
  onChange = (date) => {
    this.props.input.onChange(moment(date).format('YYYY-MM-DDT00:00:00.000'));
  }

  render() {
    const {input, meta: { touched, error }, ...custom} = this.props;

    return (
      <KeyboardDatePicker
        clearable
        value={input.value ? new Date(input.value) : null}
        placeholder="дд/мм/гггг"
        onChange={this.onChange}
        format="DD.MM.YYYY"
        autoOk
        okLabel="Ок"
        cancelLabel="Отмена"
        clearLabel="Очистить"
        error={touched && Boolean(error)}
        helperText={touched && Boolean(error) && error}
        {...custom}
      />
    );
  }
}

renderDatePicker.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};
