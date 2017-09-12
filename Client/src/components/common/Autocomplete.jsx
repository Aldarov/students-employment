import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

function renderInput(inputProps) {
  const { classes, home, value, ref, ...other } = inputProps;

  return (
    <TextField
      autoFocus={home}
      className={classes.textField}
      value={value}
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.id;
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={index} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={index} style={{ fontWeight: 500 }}>
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
    height: 200,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
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
});

class Autocomplete extends React.Component {
  state = {
    value: '',
  };

  // handleSuggestionsFetchRequested = ({ value }) => {
  //   this.setState({
  //     suggestions: getSuggestions(value),
  //   });
  // };

  // handleSuggestionsClearRequested = () => {
  //   this.setState({
  //     suggestions: [],
  //   });
  // };

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
    // this.props.onChangeValue(newValue);
  };

  render() {
    const { classes, placeholder, suggestions, onSuggestionsFetchRequested, onSuggestionsClearRequested} = this.props;

    return (
      <Autosuggest
        renderInputComponent={renderInput}
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          autoFocus: true,
          classes,
          placeholder: {placeholder},
          value: this.state.value,
          onChange: this.handleChange,
        }}
      />
    );
  }
}

Autocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
  placeholder: PropTypes.object,
  suggestions: PropTypes.array,   //suggestions - должен быть массив объектов типа: { id: <id>, name: <name> }
  onSuggestionsFetchRequested: PropTypes.func,
  onSuggestionsClearRequested: PropTypes.func,
  // onChangeValue: PropTypes.func,
};

export default withStyles(styles)(Autocomplete);
