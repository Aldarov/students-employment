import { REQUEST_START, REQUEST_END } from './fetchingActions';

export const commonAction = (dispatch, apiFunc, actions) => {
  dispatch({ type: REQUEST_START });
  return apiFunc
    .then(res => {
      actions(res);
      dispatch({ type: REQUEST_END });
    })
    .catch(error => {
      dispatch({ type: REQUEST_END });
      console.log(error);
    });
};