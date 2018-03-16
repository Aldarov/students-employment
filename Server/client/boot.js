import prerendering from 'aspnet-prerendering';
import ReactDOMServer from 'react-dom/server';
import App from './src/App';

module.exports = prerendering.createServerRenderer(function(params) {
    return new Promise(function (resolve, reject) {
        var result = ReactDOMServer.renderToString(<App />);
        console.log('result', result);
        resolve({ html: result });
    });
});
