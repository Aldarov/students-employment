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

const renderSelectField = ({
  input,
  classes,
  meta: { touched, error },
  children,
  currentValue,
  ...custom
}) => {
  return <FormControl className={classes && classes.formControl} error={touched && error}>
    <InputLabel htmlFor="speciality">Специальность</InputLabel>
    <Select
      {...input}
      onChange={(event, index, value) => input.onChange(value)}
      {...custom}
      value={currentValue}
    >
      {children}
    </Select>
    <FormHelperText>{touched && error}</FormHelperText>
  </FormControl>;
};

renderSelectField.propTypes = {
  classes: PropTypes.object,
  input: PropTypes.object,
  meta: PropTypes.object,
  children: PropTypes.array,
  currentValue: PropTypes.any,
};

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  block: {
    display: 'block',
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300,
  },
});

class Employment extends Component {
  componentWillMount() {
    this.props.onLoadData();
    this.props.onChangeTitle();
  }

  handleChangeSpeciality = event => {
    console.log('handleChangeSpeciality', this.props.data.specialityId, event.target.value);
    this.props.data.specialityId = event.target.value;

  };

  render() {
    const { classes, loading, onSubmit, pristine, submitting, data, specilities } = this.props;
    return (
      <div>
        <form onSubmit={onSubmit}>
          <Field
            name="speciality"
            component={renderSelectField}
            currentValue={data.specialityId || 0}
            classes={classes}
            onChange={this.handleChangeSpeciality}
          >
            {specilities && specilities.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
          </Field>
          <br/>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="speciality">Специальность</InputLabel>
            <Select
              input={<Input id="age-native-simple" value={data.specialityId || 0}/>}
              onChange={this.handleChangeSpeciality}
            >
              {specilities && specilities.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
            </Select>
          </FormControl>

          <Button
            className={classes.block}
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
  data: PropTypes.object,
  specilities: PropTypes.array,
};

export default reduxForm({ form: 'Employment' })(withStyles(styles)(Employment));
