import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from '../../constants';

const defaultData = {
  openedSidebar: false,
};

export default function sidebarReducer(state = defaultData, action) {
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
