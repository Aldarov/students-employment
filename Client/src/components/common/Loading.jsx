import React, { Component } from 'react';
import { CircularProgress } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
// import './Loading.scss';

const styles = () => ({
  'loadingShadingMui': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.1)',
  },
  'loadingIconMui': {
    position: 'absolute',
    fontSize: '20px',
    top: 'calc(45% - 10px)',
    left: 'calc(50% - 10px)',
  }
});

class Loading extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.loadingShadingMui}>
        <CircularProgress className={classes.loadingIconMui} />
      </div>
    );
  }
}

Loading.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Loading);
