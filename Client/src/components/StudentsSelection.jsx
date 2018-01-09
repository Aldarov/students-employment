import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from './common/dialogs/Dialog';
import List from './common/List';

class StudentsSelection extends Component {
  render () {
    const { title, data, onClose, opened, ...other } = this.props;

    return (
      <Dialog
        title={title}
        opened={opened}
        onClose={onClose}
      >
        <List
          enableSelectionState
          data={data}
          {...other}
        />
      </Dialog>
    );
  }
}

StudentsSelection.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  onClose: PropTypes.func,
  opened: PropTypes.bool
};

export default StudentsSelection;
