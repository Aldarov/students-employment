import { DIALOG_QUESTION_OPEN, DIALOG_QUESTION_CLOSE } from '../../constants';

export function openQuestionDialog(dialogName, args) {
  return dispatch => dispatch({ type: DIALOG_QUESTION_OPEN, data: {dialogName, args} });
}

export function closeQuestionDialog(dialogName) {
  return dispatch => dispatch({ type: DIALOG_QUESTION_CLOSE, data: {dialogName} });
}
