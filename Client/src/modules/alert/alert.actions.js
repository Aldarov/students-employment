import { ALERT_SHOW, ALERT_HIDE } from '../../constants';

export const alertShow = (info) => dispatch => {
  dispatch({ type: ALERT_SHOW, data: info });
};

export const alertHide = () => dispatch => {
  dispatch({ type: ALERT_HIDE });
};
