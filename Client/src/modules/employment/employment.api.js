import axios from 'axios';

const startUrl = 'api/placements';

export function apiGetEmploymentById(id) {
  return axios.get(startUrl + `/${id}`);
}

export function apiPostEmployment(data) {
  return axios.post(startUrl, data);
}

export function apiGetReport(url, id) {
  return axios.get(url + `/${id}`)
    .then(showFile);
}

function showFile(blob) {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  var newBlob = new Blob([blob], { type: 'application/pdf' });

  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
    return;
  }

  // For other browsers:
  // Create a link pointing to the ObjectURL containing the blob.
  const data = window.URL.createObjectURL(newBlob);
  var link = document.createElement('a');
  link.href = data;
  link.download = 'file.pdf';
  link.click();
  setTimeout(() => window.URL.revokeObjectURL(data), 100);
}
