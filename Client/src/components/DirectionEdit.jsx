import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';

export default class DirectionEdit extends Component {
  render() {
    const { value, items, ...other } = this.props;
    return (
      <TextField
        select
        value={value}
        {...other}
      >
        {items && items.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
      </TextField>
    );
  }
}

DirectionEdit.propTypes = {
  value: PropTypes.any,
  items: PropTypes.array,
};
