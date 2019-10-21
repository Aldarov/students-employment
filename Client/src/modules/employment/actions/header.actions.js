import {
  submit,
  isPristine
} from 'redux-form';
import { openQuestionDialog } from '../../dialogs';
import { formName }  from '../employment.container';
import { CONFIRM_SAVE_EMPLOYMENT_DIALOG } from '.';


const onHeaderLeftButtonClick = (history) => () => (dispatch, getState) => {
  const state = getState();
  const pristine = isPristine(formName)(state);
  if (pristine) {
    history.push('/employment');
  } else {
    dispatch(openQuestionDialog(CONFIRM_SAVE_EMPLOYMENT_DIALOG));
  }
};

const onHeaderRightButtonClick = () => submit(formName);

export {
  onHeaderLeftButtonClick,
  onHeaderRightButtonClick
};
