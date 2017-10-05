import axios from 'axios';
import getUrl from './configUrl';

const startUrl = 'api/placements';

export function apiGetEmploymentList({...args}) {
  let url = getUrl({startUrl, ...args});
  return axios.get(url).then(response => response);
}

export function apiGetEmploymentById(id) {
  return axios.get(startUrl + `/${id}`).then(response => response);
}
