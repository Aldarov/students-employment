import { GET_EMPLOYMENT_LIST } from '../actions';

export default function reducer(state = {}, action) {
  switch (action.type) {
  case GET_EMPLOYMENT_LIST:
    return { list: action.data};
  default:
    return state;
  }
}
