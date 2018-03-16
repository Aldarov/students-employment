import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import { busyIndicatorStyles } from './styles';

@withStyles(busyIndicatorStyles)
class BusyIndicator extends Component {
  render() {
    const { show, classes } = this.props;

    return (
      show ?
        <div className={classes.container}>
          <CircularProgress className={classes.progress} />
        </div>
        : null
    );
  }
}

BusyIndicator.propTypes = {
  show: PropTypes.bool.isRequired,
  classes: PropTypes.object,
};

export default BusyIndicator;
