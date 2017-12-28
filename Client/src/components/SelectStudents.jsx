import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from './common/List';

class SelectStudents extends Component {
  render () {
    //const {  } = this.props;

    return (
      <List
        enableSelectionState
      />
    );
  }
}

SelectStudents.propTypes = {

};

export default SelectStudents;
