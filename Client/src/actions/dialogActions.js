export const DIALOG_QUESTION_OPEN = 'DIALOG_QUESTION_OPEN';
export const DIALOG_QUESTION_CLOSE = 'DIALOG_QUESTION_CLOSE';

export function openQuestionDialog(dialogOpen, dialogText, dialogType) {
  return dispatch => dispatch({ type: DIALOG_QUESTION_OPEN, data: {dialogOpen, dialogText, dialogType} });
}

export function closeQuestionDialog() {
  return dispatch => dispatch({ type: DIALOG_QUESTION_CLOSE });
}
