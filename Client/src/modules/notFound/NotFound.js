import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Button } from '@material-ui/core';

const styles = theme => ({
  root: {
    paddingTop: '100px',
    textAlign: 'center'
  }
});

const NotFound = ({ classes }) => {
  return <div className={classes.root}>
    <h1>404</h1>
    <p>К сожалению, страница не найдена.</p>
    <Button
      variant='contained'
      href='/'
    >
      На главную
    </Button>
  </div>;
};


NotFound.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(NotFound);
