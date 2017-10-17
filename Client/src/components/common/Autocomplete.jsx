import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import _ from 'lodash';

function renderInput(inputProps) {
  const { value, ref, onClearSelectSuggestion, inputDisable, error, helperText, ...other } = inputProps;
  return (
    <div >
      <TextField
        error={error}
        helperText={error && helperText}
        inputRef={ref}
        disabled={inputDisable}
        value={value || ''}
        {...other}
      />
      <IconButton disabled={!value} onClick={onClearSelectSuggestion} >
        <ClearIcon />
      </IconButton>
    </div>
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

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
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
  textField: {
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
  state = { firstReceiveProps: true, inputDisable: false };

  componentWillReceiveProps(nextProps) {
    if (nextProps.inputProps.value && this.state.firstReceiveProps) {
      this.setState({ inputDisable: true, firstReceiveProps: false });
    }
  }

  handleChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  handleSuggestionSelected = (event, {suggestion}) => {
    if (suggestion && suggestion.id) {
      this.setState({ inputDisable: true });
      this.props.onSuggestionSelected(suggestion);
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
    this.setState({ inputDisable: false });
  }

  render() {
    const {
      id, classes, suggestions, onSuggestionsClearRequested, inputProps: {...inputProps}
    } = this.props;
    return (
      <Autosuggest
        id={id}
        theme={{
          container: classes.container,
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
    );
  }
}

Autocomplete.propTypes = {
  id: PropTypes.string,
  inputProps: PropTypes.object,
  value: PropTypes.string,
  classes: PropTypes.object.isRequired,

  suggestions: PropTypes.array,   //suggestions - должен быть массив объектов типа: { id: <id>, name: <name> }

  onSuggestionsFetchRequested: PropTypes.func,
  onSuggestionsClearRequested: PropTypes.func,

  onSuggestionSelected: PropTypes.func,
  onClearSelectedSuggestion: PropTypes.func,
};

export default withStyles(styles)(Autocomplete);
