import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import Autocomplete from './common/Autocomplete';
import Loading from './common/Loading';
import RenderSelect from './common/RenderSelect';
import RenderTextField from './common/RenderTextField';
import RenderAutocomplete from './common/RenderAutocomplete';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    marginTop: 10,
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

  // handleChangeSpeciality = event => {
  //   const { data, onSetData } = this.props;
  //   data.specialityId = event.target.value;
  //   onSetData(data);
  // };

  // handleSpecialitySuggestionSelected = value => {
  //   const { data, onSetData } = this.props;
  //   data.specialityId = value || null;
  //   onSetData(data);
  // };

  handleSpecialityChange = name => event => {
    // const { data, onSetData } = this.props;
    // data[name] = event.target.value || null;
    // onSetData(data);
  };

  handleClearSpecilitySuggestions = () => {
    // const { , onSetData } = this.props;
    // data[name] = event.target.value || null;
    // onSetData(data);
  }

  render() {
    const {
      classes, error, loading, handleSubmit, pristine, submitting,
      specialities, onGetSpecialitySuggestions, onClearSpecialitySuggestions, onClearSpecialitySelectedSuggestion, onSpecialitySelected,
      eduForms
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit} >
          <div className={classes.container}>
            <Field
              name='speciality'
              component={RenderAutocomplete}

              autoFocus={false}
              label='Специальность'
              placeholder='выберите специальность'
              className={classes.autocomplete}
              margin='normal'

              suggestions={specialities}
              onSuggestionsFetchRequested={onGetSpecialitySuggestions}
              onSuggestionsClearRequested={onClearSpecialitySuggestions}
              onSuggestionSelected={onSpecialitySelected}
              onClearSelectedSuggestion={onClearSpecialitySelectedSuggestion}
            />

            <Field
              name='entraceYear'
              component={RenderTextField}
              label='Год начала обучения'
              placeholder='введите год начала обучения'
              className={classes.textField}
              margin='normal'
            />

            <Field
              name='eduFormId'
              select
              component={RenderTextField}
              label='Форма обучения'
              placeholder='выберите форму обучения'
              className={classes.textField}
              margin='normal'
            >
              {eduForms && eduForms.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
            </Field>

            <Field
              name='docDate'
              component={RenderTextField}
              label='Дата документа'
              type="date"
              className={classes.textField}
              margin='normal'
              InputLabelProps={{
                shrink: true,
              }}
            />

            {error && <strong className={classes.error}>{error}</strong>}
          </div>

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

  specialities: PropTypes.array,
  onGetSpecialitySuggestions: PropTypes.func,
  onClearSpecialitySuggestions: PropTypes.func,
  onClearSpecialitySelectedSuggestion: PropTypes.func,
  onSpecialitySelected: PropTypes.func,

  eduForms: PropTypes.array,
};

export default reduxForm({
  form: 'employment',
})(withStyles(styles)(Employment));
