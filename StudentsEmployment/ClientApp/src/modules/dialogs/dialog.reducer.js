import {
  DIALOG_QUESTION_OPEN, DIALOG_QUESTION_CLOSE
} from '../../constants';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case DIALOG_QUESTION_OPEN: {
      const { dialogName, args } = action.data;
      const {[dialogName]: del, ...st} = state;
      return {
        ...st,
        [dialogName]: {
          open: true,
          args
        }
      };
    }
    case DIALOG_QUESTION_CLOSE: {
      const { dialogName } = action.data;
      const {[dialogName]: del, ...st} = state;
      return {
        ...st,
        [dialogName]: {
          open: false
        }
      };
    }
    default:
      return state;
  }
}
