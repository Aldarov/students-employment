export const DIALOG_QUESTION_OPEN = 'DIALOG_QUESTION_OPEN';
export const DIALOG_QUESTION_CLOSE = 'DIALOG_QUESTION_CLOSE';

export function openQuestionDialog() {
  return dispatch => dispatch({ type: DIALOG_QUESTION_OPEN });
}

export function closeQuestionDialog() {
  return dispatch => dispatch({ type: DIALOG_QUESTION_CLOSE });
}
