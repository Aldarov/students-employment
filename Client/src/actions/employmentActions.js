import { apiGetEmployment } from '../api';
import { REQUEST_START, REQUEST_END } from './fetchingActions';

export function GetEmployment(page, limit, sort, order, search) {
  return dispatch => {
    dispatch({ type: REQUEST_START });

    return apiGetEmployment(page, limit, sort, order, search)
      .then(() => {
        dispatch({ type: REQUEST_END });
      })
      .catch(() => {
        dispatch({ type: REQUEST_END });
      });
  };
}
