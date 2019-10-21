import { getFormValues } from 'redux-form';

import { saveData } from './index';
import { formName }  from '../employment.container';

const onShowDistributionReport = (history) => () => async (dispatch, getState) => {
  const state = getState();
  const formValues = getFormValues(formName)(state);
  const w = window.open();

  const res = await dispatch(saveData(history)(formValues));
  w.location = `/reports/distribution/${res.id}`;
};

const onShowEmploymentReport = (history) => () => async (dispatch, getState) => {
  const state = getState();
  const formValues = getFormValues(formName)(state);
  const w = window.open();
  const res = await dispatch(saveData(history)(formValues));
  w.location = `/reports/employment/${res.id}`;
};

export {
  onShowDistributionReport,
  onShowEmploymentReport
};
