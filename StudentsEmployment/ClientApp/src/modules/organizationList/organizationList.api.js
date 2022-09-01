import axios from 'axios';
import getUrl from '../_global/helpers/getUrl';

const startUrl = 'api/organizations';

export function apiGetOrganizations({...args}) {
  const url = getUrl({...args, startUrl});
  return axios.get(url);
}

export function apiDeleteOrganization(id) {
  return axios.delete(startUrl + `/${id}`);
}
