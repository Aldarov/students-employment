import {
  CHANGE_TITLE,
  OPEN_LEFT_COLUMN,
  CLOSE_LEFT_COLUMN,
} from '../actions';

const defaultData = {
  title: '',
  openColumn: false,
  currentForm: ''
};


export default function headerReducer(state = defaultData, action) {
  switch (action.type) {
    case CHANGE_TITLE: {
      const {title, formName} = action.data;
      return {
        ...state,
        title: title,
        currentForm: formName || ''
      };
    }
    case OPEN_LEFT_COLUMN:
      return {
        ...state,
        openColumn: true
      };
    case CLOSE_LEFT_COLUMN:
      return {
        ...state,
        openColumn: false
      };
    default:
      return state;
  }
}
