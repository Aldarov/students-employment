import {
  DIALOG_QUESTION_OPEN, DIALOG_QUESTION_CLOSE
} from '../../constants';

export default function reducer(state = [], action) {
  switch (action.type) {
    case DIALOG_QUESTION_OPEN: {
      const st = state && state.filter(item => item.dialogName !== action.data.dialogName);
      return [
        ...st,
        { dialogName: action.data.dialogName, open: true, args: action.data.args }
      ];
    }
    case DIALOG_QUESTION_CLOSE: {
      const st = state && state.filter(item => item.dialogName !== action.data.dialogName);
      return [
        ...st,
        { dialogName: action.data.dialogName, open: false }
      ];
    }
    default:
      return state;
  }
}
