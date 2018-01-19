import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from './Autocomplete';

export default function renderAutocomplete ({
  suggestions,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  onSuggestionSelected,
  onClearSelectedSuggestion,
  input,
  meta: {touched, error },
  ...custom
}) {
  return (
    <Autocomplete
      inputProps={{
        error: touched && Boolean(error),
        helperText: error,
        ...input,
        ...custom
      }}
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      onClearSelectedSuggestion={onClearSelectedSuggestion}
    />
  );
}

renderAutocomplete.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  suggestions: PropTypes.array,
  onSuggestionsFetchRequested: PropTypes.func,
  onSuggestionsClearRequested: PropTypes.func,
  onSuggestionSelected: PropTypes.func,
  onClearSelectedSuggestion: PropTypes.func,
};
