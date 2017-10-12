import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import RenderSelect from './common/RenderSelect';
import renderTextField from './common/RenderTextField';

import { MenuItem } from 'material-ui/Menu';

import Autocomplete from './common/Autocomplete';
import Loading from './common/Loading';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    display: 'block',
    marginLeft: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 400,
    display: 'block'
  },
  autocomplete: {
    minWidth: 400,
    width: 700,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 300,
    width: 300,
  },
  error: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 8,
    marginBottom: 16,
    color: 'red',
    fontWeight: 600,
    display: 'block'
  }
});

class Employment extends Component {
  componentWillMount() {
    this.props.onLoadData();
    this.props.onChangeTitle();
  }

  handleChangeSpeciality = event => {
    const { data, onSetData } = this.props;
    data.specialityId = event.target.value;
    onSetData(data);
  };

  handleSpecialitySuggestionSelected = value => {
    const { data, onSetData } = this.props;
    data.specialityId = value || null;
    onSetData(data);
  };

  handleChange = name => event => {
    const { data, onSetData } = this.props;
    data[name] = event.target.value || null;
    onSetData(data);
  };

  render() {
    const {
      classes, error, loading, handleSubmit, pristine, submitting, data,
      specilities, onGetSpecilitySuggestions, onClearSpecilitySuggestions,
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit} >
          {/* <Autocomplete
            id='speciality_id'
            initValue={data.speciality}
            inputProps={{
              error: false,
              helperText: 'ошибка',
              label: 'Специальность',
              placeholder: 'введите наименование или код специальности',
              margin:'normal',
              className: classes.autocomplete,
            }}
            suggestions={specilities}
            onSuggestionsFetchRequested={onGetSpecilitySuggestions}
            onSuggestionsClearRequested={onClearSpecilitySuggestions}
            onSuggestionSelected={this.handleChange('specialityId')}
            onClearSuggestionSelected={this.handleSpecialitySuggestionSelected}
          /> */}

          <Field
            name='entraceYear'
            component={renderTextField}
            label='Год начала обучения'
            placeholder='введите год начала обучения'
            className={classes.textField}
            type='search'
            margin='normal'
          />

          {/* <TextField
            label="Год начала обучения"
            placeholder="введите год начала обучения"
            className={classes.textField}
            margin="normal"
            type="number"
            helperText={'ошибка'}
            onChange={this.handleChange('entraceYear')}
          /> */}

          {/* <Field
            name="speciality"
            component={RenderSelect}
            caption="Специальность"
            classes={classes}
            currentValue={data.specialityId || 0}
            onChange={this.handleChangeSpeciality}
          >
            {specilities && specilities.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
          </Field> */}

          {error && <strong className={classes.error}>{error}</strong>}

          <Button
            className={classes.button}
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
  error: PropTypes.string,
  loading: PropTypes.bool,
  onLoadData: PropTypes.func,
  onSetData: PropTypes.func,
  onChangeTitle: PropTypes.func,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  data: PropTypes.object,
  initialValues: PropTypes.object,
  specilities: PropTypes.array,
  onGetSpecilitySuggestions: PropTypes.func,
  onClearSpecilitySuggestions: PropTypes.func,
  // onSpecialitySuggestionSelected: PropTypes.func,
  // onSpecialitySuggestionClear: PropTypes.func,
};

export default reduxForm({
  form: 'employment',
})(withStyles(styles)(Employment));
