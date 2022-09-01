import { DIALOG_QUESTION_OPEN, DIALOG_QUESTION_CLOSE } from '../../constants';

const openQuestionDialog = (dialogName, args) => ({ type: DIALOG_QUESTION_OPEN, data: {dialogName, args} });

const closeQuestionDialog = (dialogName) => ({ type: DIALOG_QUESTION_CLOSE, data: {dialogName} });

export {
  openQuestionDialog,
  closeQuestionDialog
};
