export const CHANGE_TITLE = 'CHANGE_TITLE';
export const OPEN_LEFT_COLUMN = 'OPEN_LEFT_COLUMN';
export const CLOSE_LEFT_COLUMN = 'CLOSE_LEFT_COLUMN';

export function changeTitle(title, formName) {
  return dispatch => dispatch({ type: CHANGE_TITLE, data: {title, formName} });
}

export function openLeftColumn() {
  return dispatch => dispatch({ type: OPEN_LEFT_COLUMN });
}

export function closeLeftColumn() {
  return dispatch => dispatch({ type: CLOSE_LEFT_COLUMN });
}
