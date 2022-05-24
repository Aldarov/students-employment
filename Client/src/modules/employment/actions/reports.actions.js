import { getFormValues, isPristine } from 'redux-form';

import { saveData } from '.';
import { formName }  from '../employment.container';

const onShowDistributionReport = (navigate, docId) => () => async (dispatch, getState) => {
  const state = getState();
  const formValues = getFormValues(formName)(state);
  const pristine = isPristine(formName)(state);
  if (!pristine)
  {
    const res = await dispatch(saveData(navigate)(formValues));
    docId = res.id;
  }

  const w = window.open();
  w.location = `/reports/distribution/${docId}`;
};

const onShowEmploymentReport = (navigate, docId) => () => async (dispatch, getState) => {
  const state = getState();
  const formValues = getFormValues(formName)(state);
  const pristine = isPristine(formName)(state);
  if (!pristine)
  {
    const res = await dispatch(saveData(navigate)(formValues));
    docId = res.id
  }

  const w = window.open();
  w.location = `/reports/employment/${docId}`;
};

export {
  onShowDistributionReport,
  onShowEmploymentReport
};
