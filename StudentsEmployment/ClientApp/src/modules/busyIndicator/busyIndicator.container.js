import { connect } from 'react-redux';

import BusyIndicator from './BusyIndicator';

const mapStateToProps = (state, { formName }) => {
  return {
    show: state.fetching[formName] || false
  };
};


export default connect(mapStateToProps)(BusyIndicator);
