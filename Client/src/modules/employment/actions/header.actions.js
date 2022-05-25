import {
  submit,
  isPristine
} from 'redux-form';
import { openQuestionDialog } from '../../dialogs';
import { formName }  from '../employment.container';
import { CONFIRM_SAVE_EMPLOYMENT_DIALOG } from '.';


const onHeaderLeftButtonClick = (navigate) => () => (dispatch, getState) => {
  const state = getState();
  const pristine = isPristine(formName)(state);
  if (pristine) {
    navigate('/employment');
  } else {
    dispatch(openQuestionDialog(CONFIRM_SAVE_EMPLOYMENT_DIALOG));
  }
};

const onHeaderRightButtonClick = () => submit(formName);

export {
  onHeaderLeftButtonClick,
  onHeaderRightButtonClick
};
