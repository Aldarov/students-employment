import { connectAdvanced } from 'react-redux';

import QuestionDialog from './QuestionDialog';

export default connectAdvanced( dispatch => (state, ownProps) => {
  const { dialogName } = ownProps.dialogProps;
  const dialogs = state.dialog.filter(item => item.dialogName === dialogName);

  const props = {
    dialogProps: ownProps.dialogProps,
    open: (dialogs && dialogs[0] && dialogs[0].open) || false,
    args: (dialogs && dialogs[0] && dialogs[0].args) || null,
  };

  const methods = {

  };

  return { ...props, ...methods, ...ownProps };
})(QuestionDialog);
