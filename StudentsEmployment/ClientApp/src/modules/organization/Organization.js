import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import { Layout } from '../layout';
import { QuestionDialog } from '../dialogs';
import { organizationStyles } from './styles';
import RenderTextField from '../_global/components/RenderTextField';
import RenderAutocomplete from '../_global/components/RenderAutocomplete';
import { CONFIRM_SAVE_ORGANIZATION_DIALOG } from './actions';


class Organization extends Component {
  componentDidMount() {
    this.props.onLoadData();
  }

  render() {
    const {
      classes,
      formName,
      headerProps, 
      handleSubmit, onSaveYes, onSaveNo,
      countriesSuggestions, onGetCountriesSuggestions, onClearCountriesSuggestions,
      onCountriesSelected, onClearCountriesSelectedSuggestion,
      addressesSuggestions, onGetKladrSuggestions, onClearKladrSuggestions,
      onKladrSelected, onClearKladrSelectedSuggestion, isRussia,
      onCancel, pristine, submitting
    } = this.props;

    return (
      <Layout
        formName={formName}
        headerProps={headerProps}
      >
        <Form className={classes.form} onSubmit={handleSubmit}>
          <Field
            name='name'
            component={RenderTextField}
            label='Наименование организации'
            placeholder='Введите наименование организации'
            className={classes.textField}
          />
          <Field
            name='countryName'
            component={RenderAutocomplete}
            autoFocus={false}
            label='Страна'
            placeholder='Выберите страну'
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
            placeholder='Напишите населенный пункт'
            className={classes.autocomplete}
            disabled={!isRussia}
            hideIcon={!isRussia}
            suggestions={addressesSuggestions}
            onSuggestionsFetchRequested={onGetKladrSuggestions}
            onSuggestionsClearRequested={onClearKladrSuggestions}
            onSuggestionSelected={onKladrSelected}
            onClearSelectedSuggestion={onClearKladrSelectedSuggestion}
          />
        </Form>
        <Button variant="contained" color="primary" disabled={pristine || submitting} className={classes.button} onClick={onSaveYes}>
          Сохранить
        </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={onCancel}>
          Отмена
        </Button>
        <QuestionDialog
          dialogName={CONFIRM_SAVE_ORGANIZATION_DIALOG}
          contentText='Сохранить измененные данные?'
          onYes={onSaveYes}
          onNo={onSaveNo}
        />
      </Layout>
    );
  }
}

Organization.propTypes = {
  classes: PropTypes.object,
  formName: PropTypes.string,
  headerProps: PropTypes.object,
  onCancel: PropTypes.func,

  onLoadData: PropTypes.func,
  handleSubmit: PropTypes.func,
  onSaveYes: PropTypes.func,
  onSaveNo: PropTypes.func,

  countriesSuggestions: PropTypes.array,
  onGetCountriesSuggestions: PropTypes.func,
  onClearCountriesSuggestions: PropTypes.func,
  onCountriesSelected: PropTypes.func,
  onClearCountriesSelectedSuggestion: PropTypes.func,

  addressesSuggestions: PropTypes.array,
  onGetKladrSuggestions: PropTypes.func,
  onClearKladrSuggestions: PropTypes.func,
  onKladrSelected: PropTypes.func,
  onClearKladrSelectedSuggestion: PropTypes.func,

  isRussia: PropTypes.bool
};

export default withStyles(organizationStyles)(Organization);
