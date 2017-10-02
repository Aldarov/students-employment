import { LOAD_SPECIALITIES } from '../actions';

export default function reducer(state = '', action) {
  switch (action.type) {
  case LOAD_SPECIALITIES:
    return action.data;
  default:
    return state;
  }
}
