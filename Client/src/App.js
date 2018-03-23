import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui-prev/styles/MuiThemeProvider';
import bowser from 'bowser';

import store from './store';
import { Navigation } from './modules/navigation';

if (bowser.msie) {
  const root = document.getElementById('root');
  root.innerHTML = `
    <p>Версия данного браузера не поддерживается.</p>
    Пожалуйста, используйте последние стабильные версии следующих браузеров: Google Chrome, Mozilla Firefox, Safari, Opera и Microsoft Edge
  `;
  root.setAttribute('style', 'text-align: center; font-size: 1.5em; margin-top: 50px;');
  document.body.appendChild(root);
} else {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <Navigation/>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
  );
}

