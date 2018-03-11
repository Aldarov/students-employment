import axios from 'axios';
import getUrl from '../_global/helpers/getUrl';

const startUrl = 'api/organizations';

export function apiGetOrganizationById(id) {
  return axios.get(startUrl + `/${id}`);
}

export function apiPostOrganization(data) {
  return axios.post(startUrl, data);
}

export function apiGetCountries({...args}) {
  const url = getUrl({startUrl: 'api/countries', ...args});
  return axios.get(url);
}

export function apiGetAddresses({...args}) {
  const url = getUrl({startUrl: 'api/addresses', ...args});
  return axios.get(url);
}

export function apiSearchAddress({...args}) {
  const url = getUrl({startUrl: 'api/addresses/search', ...args});
  return axios.get(url);
}
