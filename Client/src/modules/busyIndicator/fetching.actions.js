import Alert from 'react-s-alert';

import { FETCHING_START, FETCHING_END } from '../../constants';

const fetching = (dispatch, formName, action) => {
  dispatch({ type: FETCHING_START, data: formName });
  return action
    .then(res => {
      dispatch({ type: FETCHING_END, data: formName });
      return res;
    })
    .catch(err => {
      dispatch({ type: FETCHING_END, data: formName });
      Alert.error(err.data);
      return err;
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
    Alert.error(error.data);
    throw error;
  }
};

const fetchingEnd = (formName) => ({ type: FETCHING_END, data: formName });

export {
  fetching,
  fetchingEnd,
  fetchingAsync
};
