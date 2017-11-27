import {
  DIALOG_QUESTION_OPEN, DIALOG_QUESTION_CLOSE
} from '../actions';

const defaultData = {
  dialogOpen: false,
  dialogText: '',
  dialogType: ''
};

export default function reducer(state = defaultData, action) {
  switch (action.type) {
    case DIALOG_QUESTION_OPEN: {
      return {
        ...state,
        ...action.data
      };
    }
    case DIALOG_QUESTION_CLOSE: {
      return defaultData;
    }
    default:
      return state;
  }
}
