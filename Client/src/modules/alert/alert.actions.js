import { ALERT_SHOW, ALERT_HIDE } from '../../constants';

export const alertShow = (message) => dispatch => {
  dispatch({ type: ALERT_SHOW, data: message });
};

export const alertHide = () => dispatch => {
  dispatch({ type: ALERT_HIDE });
};
