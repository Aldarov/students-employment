import {
  DIALOG_QUESTION_OPEN, DIALOG_QUESTION_CLOSE
} from '../actions';

const defaultData = {
  dialogOpen: false,
};

export default function reducer(state = defaultData, action) {
  switch (action.type) {
    case DIALOG_QUESTION_OPEN: {
      return {
        ...state,
        dialogOpen: true
      };
    }
    case DIALOG_QUESTION_CLOSE: {
      return {
        ...state,
        dialogOpen: false
      };
    }
    default:
      return state;
  }
}
