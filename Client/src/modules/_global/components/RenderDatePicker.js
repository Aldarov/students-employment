import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui-prev/DatePicker';
import IntlPolyfill from 'intl';
import 'intl/locale-data/jsonp/ru-RU';
import moment from 'moment';


export default class renderDatePicker extends Component {
  onChange = (event, date) => {
    this.props.input.onChange(moment(date).format('YYYY-MM-DDT00:00:00.000'));
    this.props.input.onBlur();
  }

  render() {
    const {input, meta: { touched, error }, ...custom} = this.props;

    return (
      <DatePicker
        autoOk
        DateTimeFormat={IntlPolyfill.DateTimeFormat}
        locale="ru-Ru"
        okLabel="Ок"
        cancelLabel="Отмена"
        errorText={touched && Boolean(error) && error}
        value={input.value ? new Date(input.value) : {}}
        onChange={this.onChange}
        onFocus={input.onFocus}
        {...custom}
      />
    );
  }
}

renderDatePicker.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};
