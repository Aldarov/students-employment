import { connectAdvanced } from 'react-redux';
import { withRouter } from 'react-router';

import AuthHOC from './AuthHOC';
import Main from '../Components/Main';

export default AuthHOC(withRouter(
  connectAdvanced(() => (state, ownProps) => {
    const props = {
      title: state.header.title
    };

    const methods = {
      onRedirectToEmployment: () => {
        ownProps.history.push('/employment');
      },
      onRedirectToOrganization: () => {
        ownProps.history.push('/organization');
      }
    };

    return { ...props, ...methods, ...ownProps };
  })(Main)
));
