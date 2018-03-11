import {
  SET_COUNRIES_SUGGESTIONS,
  CLEAR_COUNRIES_SUGGESTIONS,
  SET_ADDRESSES_SUGGESTIONS,
  CLEAR_ADDRESSES_SUGGESTIONS
} from '../../constants';

const defaultData = {
  addressesSuggestions: [],
  countriesSuggestions: [],
};

export default function reducer(state = defaultData, action) {
  switch (action.type) {
    case SET_ADDRESSES_SUGGESTIONS:
      return {
        ...state,
        addressesSuggestions: action.data
      };
    case CLEAR_ADDRESSES_SUGGESTIONS:
      return {
        ...state,
        addressesSuggestions: []
      };
    case SET_COUNRIES_SUGGESTIONS:
      return {
        ...state,
        countriesSuggestions: action.data
      };
    case CLEAR_COUNRIES_SUGGESTIONS:
      return {
        ...state,
        countriesSuggestions: []
      };
    default:
      return state;
  }
}
