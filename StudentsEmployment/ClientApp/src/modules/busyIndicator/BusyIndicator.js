import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';

import { busyIndicatorStyles } from './styles';

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

export default withStyles(busyIndicatorStyles)(BusyIndicator);
