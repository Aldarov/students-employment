import { GET_SPECIALITIES_SUGGESTIONS, CLEAR_SPECIALITIES_SUGGESTIONS } from '../actions';

const defaultData = {
  specialities: [],
  schools: [],
  eduForms: [],
};

export default function reducer(state = defaultData, action) {
  switch (action.type) {
  case GET_SPECIALITIES_SUGGESTIONS:
    return {
      ...state,
      specialities: action.data
    };
  case CLEAR_SPECIALITIES_SUGGESTIONS:
    return {
      ...state,
      specialities: []
    };

  default:
    return state;
  }
}
