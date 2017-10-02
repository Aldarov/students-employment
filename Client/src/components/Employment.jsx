import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import Button from 'material-ui/Button';
import { TextField,  } from '@gfpacheco/redux-form-material-ui';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';

import { withStyles } from 'material-ui/styles';

import Loading from './common/Loading';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class Employment extends Component {
  componentWillMount() {
    this.props.onLoadData();
    this.props.onChangeTitle();
  }

  render() {
    const { classes, loading, onSubmit, pristine, submitting, specilities } = this.props;
    return (
      <div>
        <form onSubmit={onSubmit}>
          {/* <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple">Age</InputLabel>
            <Select
              value={this.state.age}
              onChange={this.handleChange('age')}
              input={<Input id="age-simple" />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl> */}

          <Field
            name="login"
            component={TextField}
            placeholder="Введите логин"
            label="Логин"
            margin="normal"
          />

          <Button
            type="submit"
            raised
            color="primary"
            disabled={pristine || submitting}
          >
            Сохранить
          </Button>
        </form>
        {loading && <Loading />}
      </div>
    );
  }
}

Employment.propTypes = {
  classes: PropTypes.object,
  loading: PropTypes.bool,
  onLoadData: PropTypes.func,
  onChangeTitle: PropTypes.func,
  onSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  specilities: PropTypes.array,
};

export default reduxForm({ form: 'Employment' })(withStyles(styles)(Employment));
