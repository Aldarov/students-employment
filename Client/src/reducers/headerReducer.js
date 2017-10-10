import { CHANGE_TITLE } from '../actions';

export default function headerReducer(state = '', action) {
  switch (action.type) {
    case CHANGE_TITLE:
      return {title: action.title};
    default:
      return state;
  }
}
