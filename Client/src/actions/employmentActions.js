import { apiGetEmployment } from '../api';
import { REQUEST_START, REQUEST_END } from './fetchingActions';
export const GET_EMPLOYMENT_LIST = 'GET_EMPLOYMENT_LIST';

export function GetEmploymentList({page, limit, sort, order, search}) {
  console.log(page, limit, sort, order, search);
  return dispatch => {
    dispatch({ type: REQUEST_START });

    return apiGetEmployment(page, limit, sort, order, search)
      .then((res) => {
        dispatch({ type: GET_EMPLOYMENT_LIST, data: res.data});
        dispatch({ type: REQUEST_END });
      })
      .catch(() => {
        dispatch({ type: REQUEST_END });
      });
  };
}
