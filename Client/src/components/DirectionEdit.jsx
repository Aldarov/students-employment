import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DirectionEdit extends Component {
  render() {
    const { data } = this.props;
    console.log('DirectionEdit', data);
    return (
      <div>
        {data.text} !!!!!!!!!!!!!!
      </div>
    );
  }
}

DirectionEdit.propTypes = {
  data: PropTypes.object,
};
