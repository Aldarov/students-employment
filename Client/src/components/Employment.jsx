import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import RenderSelect from './common/RenderSelect';
import { MenuItem } from 'material-ui/Menu';
// import { FormControl, FormHelperText } from 'material-ui/Form';
// import { InputLabel } from 'material-ui/Input';

import Autocomplete from './common/Autocomplete';
import Loading from './common/Loading';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  block: {
    display: 'block'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 400,
    display: 'block'
  },
  autocomplete: {
    minWidth: 400,
    width: 700,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 200,
    width: 200,
  },
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
    console.log(event);
    const { data, onSetData } = this.props;
    const value = event.target.value || null;
    console.log(value);

    switch (name) {
      case 'specialityId': {
        data.specialityId = value;
        break;
      }
      case 'entraceYear': {
        data.entraceYear = value;
        break;
      }
    }

    onSetData(data);

    // this.setState({
    //   [name]: event.target.value,
    // });
  };

  render() {
    const {
      classes, loading, onSubmit, pristine, submitting, data,
      specilities, onGetSpecilitySuggestions, onClearSpecilitySuggestions,
    } = this.props;
    return (
      <div>
        <form onSubmit={onSubmit} >
          <Autocomplete
            id='speciality_id'
            label='Год начала обучения'
            style={classes.autocomplete}
            initValue={data.speciality}
            placeholder="Специальность"
            suggestions={specilities}
            onSuggestionsFetchRequested={onGetSpecilitySuggestions}
            onSuggestionsClearRequested={onClearSpecilitySuggestions}
            onSuggestionSelected={this.handleChange('specialityId')}
            onClearSuggestionSelected={this.handleSpecialitySuggestionSelected}
          />

          <TextField
            label="Год начала обучения"
            placeholder="Введите год"
            className={classes.textField}
            margin="normal"
            type="number"
            value={data.entraceYear || null}
            helperText={'ошибка'}
            onChange={this.handleChange('entraceYear')}
          />

          <Field
            name="speciality"
            component={RenderSelect}
            caption="Специальность"
            classes={classes}
            currentValue={data.specialityId || 0}
            onChange={this.handleChangeSpeciality}
          >
            {specilities && specilities.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
          </Field>

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
  onSetData: PropTypes.func,
  onChangeTitle: PropTypes.func,
  onSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  data: PropTypes.object,
  specilities: PropTypes.array,
  onGetSpecilitySuggestions: PropTypes.func,
  onClearSpecilitySuggestions: PropTypes.func,
  // onSpecialitySuggestionSelected: PropTypes.func,
  // onSpecialitySuggestionClear: PropTypes.func,
};

export default reduxForm({ form: 'Employment' })(withStyles(styles)(Employment));
