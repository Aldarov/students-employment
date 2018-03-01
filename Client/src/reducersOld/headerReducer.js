import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
} from '../actions';

const defaultData = {
  openedSidebar: false,
};


export default function headerReducer(state = defaultData, action) {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return {
        ...state,
        openedSidebar: true
      };
    case CLOSE_SIDEBAR:
      return {
        ...state,
        openedSidebar: false
      };
    default:
      return state;
  }
}
