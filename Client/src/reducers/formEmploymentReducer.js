import {
  GET_EMPLOYMENT_BY_ID
} from '../actions';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_EMPLOYMENT_BY_ID: {
      return {
        ...state,
        initialValues: action.data,
      };
    }
    default:
      return state;
  }
}
