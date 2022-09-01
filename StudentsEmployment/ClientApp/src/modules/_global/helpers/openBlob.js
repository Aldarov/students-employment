import axios from 'axios';

export default function openBlob(url) {
  return axios.get(url, { responseType: 'blob' })
    .then(blob => {
      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob);
        return;
      }
      window.open(window.URL.createObjectURL(blob));
    });
}
