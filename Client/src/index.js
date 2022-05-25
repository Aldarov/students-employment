import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import bowser from 'bowser';
import 'normalize.css';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import 'moment/locale/ru';

import store from './store';
import { App } from './modules/app';

const container = document.getElementById('root');

if (bowser.msie) {
  container.innerHTML = `
    <p>Версия данного браузера не поддерживается.</p>
    Пожалуйста, используйте последние стабильные версии следующих браузеров: Google Chrome, Mozilla Firefox, Safari, Opera и Microsoft Edge
  `;
  container.setAttribute('style', 'text-align: center; font-size: 1.5em; margin-top: 50px;');
  document.body.appendChild(container);
} else {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <App/>
      </MuiPickersUtilsProvider>
    </Provider>
  );
}
