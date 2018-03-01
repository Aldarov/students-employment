import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui-prev/styles/MuiThemeProvider';

import store from './store';
import { Navigation } from './modules/navigation';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Navigation/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
