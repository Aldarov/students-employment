
import {
  submit,
  isPristine
} from 'redux-form';

import { openQuestionDialog } from '../../dialogs';
import { CONFIRM_SAVE_ORGANIZATION_DIALOG } from '.';
import { formName } from '../organization.container';

const onHeaderLeftButtonClick = (history) => () => (dispatch, getState) => {
  const state = getState();
  const pristine = isPristine(formName)(state);
  if (!pristine) {
    dispatch(openQuestionDialog(CONFIRM_SAVE_ORGANIZATION_DIALOG));
  } else {
    history.push('/organization');
  }
};

const onHeaderRightButtonClick = () => submit(formName);

export {
  onHeaderLeftButtonClick,
  onHeaderRightButtonClick
};
