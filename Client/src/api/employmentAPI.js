import axios from 'axios';
import getUrl from './configUrl';

const startUrl = 'api/placements';

export function apiGetEmploymentList({...args}) {
  const url = getUrl({startUrl, ...args});
  return axios.get(url);
}

export function apiGetEmploymentById(id) {
  return axios.get(startUrl + `/${id}`);
}

export function apiPostEmployment(data) {
  return axios.post(startUrl, data);
}

export function apiDeleteEmployment(id) {
  return axios.delete(startUrl + `/${id}`);
}
