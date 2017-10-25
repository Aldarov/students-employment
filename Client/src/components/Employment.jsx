import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';

import Loading from './common/Loading';
import RenderTextField from './common/RenderTextField';
import RenderAutocomplete from './common/RenderAutocomplete';
import RenderDatePicker from './common/RenderDatePicker';
import List from './common/List';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    marginTop: theme.spacing.unit,
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
    margin: theme.spacing.unit,
  },
  textField: {
    margin: theme.spacing.unit,
    minWidth: 300,
    width: 300,
  },
  error: {
    margin: theme.spacing.unit,
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

  render() {
    const {
      classes, error, loading, handleSubmit, pristine, submitting, eduForms,
      specialities, onGetSpecialitySuggestions, onClearSpecialitySuggestions, onClearSpecialitySelectedSuggestion, onSpecialitySelected,
      students, columnsStudents, listColumnWidthsStudents, onDoActionStudents
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
            />

            <Field
              name='eduFormId'
              select
              component={RenderTextField}
              label='Форма обучения'
              placeholder='выберите форму обучения'
              className={classes.textField}
            >
              {eduForms && eduForms.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
            </Field>

            <Field
              name='docDate'
              component={RenderDatePicker}
              className={classes.textField}
              floatingLabelText='Дата документа'
              hintText="Дата документа"
            />

            {error && <strong className={classes.error}>{error}</strong>}
          </div>

          <List
            data={students}
            columns={columnsStudents}
            defaultColumnWidths={listColumnWidthsStudents}
            allowAdding
            allowEditing
            allowDeleting
            doAction={onDoActionStudents}
          />
          {/*
            allowSorting
            sorting={sorting}
            changeSorting={onChangeSorting}
          */}

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
  eduForms: PropTypes.array,

  specialities: PropTypes.array,
  onGetSpecialitySuggestions: PropTypes.func,
  onClearSpecialitySuggestions: PropTypes.func,
  onClearSpecialitySelectedSuggestion: PropTypes.func,
  onSpecialitySelected: PropTypes.func,

  students: PropTypes.array,
  columnsStudents: PropTypes.array,
  listColumnWidthsStudents: PropTypes.object,
  onDoActionStudents: PropTypes.func,
};

export default reduxForm({
  form: 'employment'
})(withStyles(styles)(Employment));
