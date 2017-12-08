import axios from 'axios';
import getUrl from './configUrl';

export function apiGetOrganizations({...args}) {
  const url = getUrl({startUrl: 'api/organizations', ...args});
  return axios.get(url);
}
