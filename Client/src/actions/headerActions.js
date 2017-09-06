export const CHANGE_TITLE = 'CHANGE_TITLE';

export function changeTitle(title) {
  return dispatch => {
    dispatch({ type: CHANGE_TITLE, title });
  };
}
