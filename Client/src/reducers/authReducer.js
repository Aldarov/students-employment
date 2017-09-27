import { LOGIN, LOGOUT } from '../actions';

export default function reducer(state = false, action) {
  console.log('reducer',action.type);
  switch (action.type) {
  case LOGIN:
    return true;
  case LOGOUT:
    return false;
  default:
    return state;
  }
}
