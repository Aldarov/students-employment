import { ALERT_SHOW, ALERT_HIDE } from '../../constants';

const initialState = {
  info: null,
  open: false
};

export const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALERT_SHOW: {
      return {
        info: action.data,
        open: true
      };
    }
    case ALERT_HIDE: {
      return {
        info: null,
        open: false
      };
    }
    default:
      return state;
  }
}
