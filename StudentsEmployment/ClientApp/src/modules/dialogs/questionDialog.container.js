import { connect } from 'react-redux';

import QuestionDialog from './QuestionDialog';

const mapStateToProps = (state, props) => {
  const { dialogName } = props;

  return {
    open: (state.dialog[dialogName] && state.dialog[dialogName].open) || false,
    args: (state.dialog[dialogName] && state.dialog[dialogName].args) || null
  };
};

export default connect(mapStateToProps)(QuestionDialog);
