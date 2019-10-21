import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import bowser from 'bowser';
import 'normalize.css';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import 'moment/locale/ru';

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
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Navigation/>
      </MuiPickersUtilsProvider>
    </Provider>,
    document.getElementById('root')
  );
}
