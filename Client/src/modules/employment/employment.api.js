import axios from 'axios';

const startUrl = 'api/placements';

export function apiGetEmploymentById(id) {
  return axios.get(startUrl + `/${id}`);
}

export function apiPostEmployment(data) {
  return axios.post(startUrl, data);
}

export function apiGetReport(url, id) {
  return axios.get(url + `/${id}`, { responseType: 'blob' })
    .then(showPdf);
}

function showPdf(blob) {
  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob);
    return;
  }

  const url = window.URL.createObjectURL(blob);
  window.location.href = url;
}
