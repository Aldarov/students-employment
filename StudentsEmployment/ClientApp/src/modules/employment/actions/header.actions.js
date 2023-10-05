import {
  submit,
  isPristine
} from 'redux-form';
import { openQuestionDialog } from '../../dialogs';
import { formName }  from '../employment.container';
import { CONFIRM_SAVE_EMPLOYMENT_DIALOG } from '.';


const onHeaderRightButtonClick = () => submit(formName);

export {
  onHeaderRightButtonClick
};
