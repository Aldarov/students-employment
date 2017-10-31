import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

import RenderTextField from './common/RenderTextField';

const styles = theme => ({
  field: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  }
});

class DirectionEdit extends Component {
  render() {
    const { classes, rowId, directionTypes } = this.props;
    return (
      <div>
        <Field
          name={'pgContractStuffs['+rowId+'].directionTypeId'}
          select
          component={RenderTextField}
          label='Тип распределения'
          placeholder='Выберите тип распределения'
          className={classes.field}
        >
          {directionTypes && directionTypes.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
        </Field>
      </div>
    );
  }
}

DirectionEdit.propTypes = {
  classes: PropTypes.object,
  rowId: PropTypes.number.isRequired,
  directionTypes: PropTypes.array.isRequired,
};

export default withStyles(styles)(DirectionEdit);
