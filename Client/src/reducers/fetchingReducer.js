import { REQUEST_START, REQUEST_END } from '../actions';

export default function reducer(state = false, action) {
  switch (action.type) {
  case REQUEST_START:
    return true;
  case REQUEST_END:
    return false;
  default:
    return state;
  }
}
