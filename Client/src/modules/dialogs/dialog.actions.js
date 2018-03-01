import { DIALOG_QUESTION_OPEN, DIALOG_QUESTION_CLOSE } from '../../constants';

export function openQuestionDialog() {
  return dispatch => dispatch({ type: DIALOG_QUESTION_OPEN });
}

export function closeQuestionDialog() {
  return dispatch => dispatch({ type: DIALOG_QUESTION_CLOSE });
}
