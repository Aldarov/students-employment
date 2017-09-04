import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import MuiThemeProvider from 'material-ui/styles';
// import injectTapEventPlugin from 'react-tap-event-plugin';

import { getStore} from './store';
import App from './App';

// injectTapEventPlugin();
const store = getStore();

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
