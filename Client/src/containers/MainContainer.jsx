import { connectAdvanced } from 'react-redux';
import { withRouter } from 'react-router';

import AuthHOC from './AuthHOC';
import Main from '../components/Main';
// import { loadSpecialities } from '../actions/dictionariesActions';

export default AuthHOC(withRouter(
  connectAdvanced(dispatch => (state, ownProps) => {
    const props = {
      title: state.header.title
    };

    const methods = {
      onRedirectToEmployment: () => {
        ownProps.history.push('/employment');
      },
      onRedirectToOrganization: () => {
        ownProps.history.push('/organization');
      },
      onLoadData: () => {
        // dispatch(loadSpecialities());
      },
    };

    return { ...props, ...methods, ...ownProps };
  })(Main)
));
