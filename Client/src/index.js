import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import createHistory from 'history/createBrowserHistory';
// import { ConnectedRouter } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { getStore} from './store';
import App from './App';

injectTapEventPlugin();
const store = getStore();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
