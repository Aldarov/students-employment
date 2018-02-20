import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'redux-form';
import { withStyles } from 'material-ui/styles';

import Loading from '../common/Loading';
import RenderTextField from '../common/RenderTextField';
import RenderAutocomplete from '../common/RenderAutocomplete';

const styles = theme => ({
  form: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    flex: 1,
    backgroundColor: 'green'
  },
  textField: {
    marginTop: theme.spacing.unit*2,
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
  },
  autocomplete: {
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 600,
    },
  },
});

class Organization extends Component {
  componentWillMount() {
    this.props.onLoadData();
  }

  render () {
    const {
      classes, loading, handleSubmit,
      countriesSuggestions, onGetCountriesSuggestions, onClearCountriesSuggestions,
      onCountriesSelected, onClearCountriesSelectedSuggestion,
      addressesSuggestions, onGetKladrSuggestions, onClearKladrSuggestions,
      onKladrSelected, onClearKladrSelectedSuggestion
    } = this.props;

    return (
      <Form className={classes.form} onSubmit={handleSubmit}>
        <Field
          name='name'
          component={RenderTextField}
          label='Наименование организации'
          placeholder='введите наименование организации'
          className={classes.textField}
        />
        <Field
          name='countryName'
          component={RenderAutocomplete}
          autoFocus={false}
          label='Страна'
          placeholder='выберите страну'
          className={classes.autocomplete}

          suggestions={countriesSuggestions}
          onSuggestionsFetchRequested={onGetCountriesSuggestions}
          onSuggestionsClearRequested={onClearCountriesSuggestions}
          onSuggestionSelected={onCountriesSelected}
          onClearSelectedSuggestion={onClearCountriesSelectedSuggestion}
        />
        <Field
          name='address'
          component={RenderAutocomplete}
          autoFocus={false}
          label='Адрес организации'
          placeholder='укажите адрес организации'
          className={classes.autocomplete}

          suggestions={addressesSuggestions}
          onSuggestionsFetchRequested={onGetKladrSuggestions}
          onSuggestionsClearRequested={onClearKladrSuggestions}
          onSuggestionSelected={onKladrSelected}
          onClearSelectedSuggestion={onClearKladrSelectedSuggestion}
        />
        {loading && <Loading />}
      </Form>
    );
  }
}

Organization.propTypes = {
  onLoadData: PropTypes.func,
  classes: PropTypes.object,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,

  countriesSuggestions: PropTypes.array,
  onGetCountriesSuggestions: PropTypes.func,
  onClearCountriesSuggestions: PropTypes.func,
  onCountriesSelected: PropTypes.func,
  onClearCountriesSelectedSuggestion: PropTypes.func,

  addressesSuggestions: PropTypes.array,
  onGetKladrSuggestions: PropTypes.func,
  onClearKladrSuggestions: PropTypes.func,
  onKladrSelected: PropTypes.func,
  onClearKladrSelectedSuggestion: PropTypes.func
};

export default withStyles(styles)(Organization);
