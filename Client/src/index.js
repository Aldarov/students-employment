import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui-prev/styles/MuiThemeProvider';

import { getStore} from './store';
import { checkAuth } from './actions';
import { initAxios } from './api';
import App from './App';

const store = getStore();
initAxios(store);
store.dispatch(checkAuth());

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
