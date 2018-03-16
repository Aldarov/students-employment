import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from '../../constants';

export function openSidebar() {
  return dispatch => dispatch({ type: OPEN_SIDEBAR });
}

export function closeSidebar() {
  return dispatch => dispatch({ type: CLOSE_SIDEBAR });
}
