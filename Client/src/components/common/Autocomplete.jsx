import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';

import { FormControl, FormHelperText } from 'material-ui/Form';

import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import _ from 'lodash';

function renderInput(inputProps) {
  const {
    className, value, onChange, ref, label,
    error, helperText,
    onClearSelectSuggestion, inputDisable,
    ...other
  } = inputProps;

  return (
    <FormControl className={className}
      error={error}
    >
      <InputLabel>{label}</InputLabel>
      <Input
        type='select'
        disabled={inputDisable}
        error={error}
        inputRef={ref}
        value={value || ''}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={onClearSelectSuggestion}
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        }
        {...other}
      />
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={index} style={{ fontWeight: 700 }}>
              {part.text}
            </span>
          ) : (
            <strong key={index} style={{ fontWeight: 'normal' }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

const styles = () => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999999
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  root: {
    width: '100%',
  },
  renderInput: {
    display: 'flex',
  },
  clearIcon:{
    alignSelf: 'center'
  }
});

class Autocomplete extends React.Component {
  state = {
    value: '',
    inputDisable: false,
    // firstReceiveProps: true,
  };

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.inputProps && nextProps.inputProps.value && this.state.firstReceiveProps) {
  //     this.setState({ firstReceiveProps: false, inputDisable: true });
  //   }
  // }

  handleChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  handleSuggestionSelected = (event, {suggestion}) => {
    if (suggestion && suggestion.id) {
      this.props.onSuggestionSelected(suggestion);
      this.setState({value: suggestion.name, inputDisable: true });
    }
  }

  handleGetSuggestionValue = (suggestion) => {
    return suggestion.name;
  }

  debounceSuggestionsFetch = _.debounce((val) => {
    this.props.onSuggestionsFetchRequested(val);
  }, 500);

  handleSuggestionsFetchRequested = ({ value }) => {
    this.debounceSuggestionsFetch(value);
  }

  handleClearSelectSuggestion = () => {
    this.props.onClearSelectedSuggestion();
    this.setState({ value: '', inputDisable: false });
  }

  render() {
    const {
      id, classes, className, suggestions, onSuggestionsClearRequested, inputProps: {...inputProps}
    } = this.props;

    return (
      <div className={className}>
        <Autosuggest
          id={id}
          theme={{
            container: classes.container,
            root: classes.root,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderInputComponent={renderInput}
          renderSuggestionsContainer={renderSuggestionsContainer}
          renderSuggestion={renderSuggestion}
          getSuggestionValue={this.handleGetSuggestionValue}
          inputProps={{
            value: this.state.value,
            onChange: this.handleChange,
            onClearSelectSuggestion: this.handleClearSelectSuggestion,
            inputDisable: this.state.inputDisable,
            ...inputProps
          }}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={this.handleSuggestionSelected}
        />
      </div>
    );
  }
}

Autocomplete.propTypes = {
  id: PropTypes.string,
  inputProps: PropTypes.object,
  value: PropTypes.string,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,

  //suggestions - должен быть массив объектов типа: { id: <id>, name: <name> }
  suggestions: PropTypes.array,

  onSuggestionsFetchRequested: PropTypes.func,
  onSuggestionsClearRequested: PropTypes.func,

  onSuggestionSelected: PropTypes.func,
  onClearSelectedSuggestion: PropTypes.func,
};

export default withStyles(styles)(Autocomplete);
