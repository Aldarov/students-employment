export const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';

export function openSidebar() {
  return dispatch => dispatch({ type: OPEN_SIDEBAR });
}

export function closeSidebar() {
  return dispatch => dispatch({ type: CLOSE_SIDEBAR });
}
