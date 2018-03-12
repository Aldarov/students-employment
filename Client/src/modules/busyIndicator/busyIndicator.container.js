import { connectAdvanced } from 'react-redux';

import BusyIndicator from './BusyIndicator';

export default connectAdvanced( dispatch => (state, ownProps) => {
  const { formName } = ownProps;
  const fetching = state.fetching.filter(item => item.type === formName);

  const props = {
    show: (fetching && fetching[0] && fetching[0].value) || false
  };

  const methods = {

  };

  return { ...props, ...methods, ...ownProps };
})(BusyIndicator);
