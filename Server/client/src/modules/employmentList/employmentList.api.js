import axios from 'axios';
import getUrl from '../_global/helpers/getUrl';

const startUrl = 'api/placements';

export function apiGetEmploymentList({...args}) {
  const url = getUrl({startUrl, ...args});
  return axios.get(url);
}

export function apiDeleteEmployment(id) {
  return axios.delete(startUrl + `/${id}`);
}
