import { REQUEST_START, REQUEST_END } from './fetchingActions';

export const commonAction = (dispatch, apiFunc, actions) => {
  console.log('commonAction', dispatch, apiFunc, actions);
  dispatch({ type: REQUEST_START });
  return apiFunc
    .then((res) => {
      actions(res);
      dispatch({ type: REQUEST_END });
      console.log(res);
    })
    .catch((error) => {
      dispatch({ type: REQUEST_END });
      console.log(error);
    });
};
