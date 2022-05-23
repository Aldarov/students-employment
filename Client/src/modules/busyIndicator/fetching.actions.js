import { alertShow } from '../alert';

import { FETCHING_START, FETCHING_END } from '../../constants';

const fetching = (dispatch, formName, action) => {
  dispatch({ type: FETCHING_START, data: formName });
  return action
    .then(res => {
      dispatch({ type: FETCHING_END, data: formName });
      return res;
    })
    .catch(error => {
      dispatch({ type: FETCHING_END, data: formName });
      dispatch(alertShow({ message: error.data, severity: 'error' }));
      return error;
    });
};

const fetchingAsync = async (dispatch, formName, action) => {
  dispatch({ type: FETCHING_START, data: formName });
  try {
    const res = await action;
    dispatch({ type: FETCHING_END, data: formName });
    return res;
  } catch (error) {
    dispatch({ type: FETCHING_END, data: formName });
    dispatch(alertShow({ message: error.data, severity: 'error' }));
    throw error;
  }
};

const fetchingEnd = (formName) => ({ type: FETCHING_END, data: formName });

export {
  fetching,
  fetchingEnd,
  fetchingAsync
};
