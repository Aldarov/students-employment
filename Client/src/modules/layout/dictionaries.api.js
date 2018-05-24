import axios from 'axios';
import getUrl from '../_global/helpers/getUrl';

export function apiGetSpecialities({...args}) {
  const url = getUrl({startUrl: 'api/specialities', ...args});
  return axios.get(url);
}

export function apiGetEduForms({...args}) {
  const url = getUrl({startUrl: 'api/eduforms', ...args});
  return axios.get(url);
}

export function apiGetPgTypes(id) {
  const url = getUrl({startUrl: 'api/pgtypes/' + id});
  return axios.get(url);
}

export function apiGetSchools({...args}) {
  const url = getUrl({startUrl: 'api/schools', ...args});
  return axios.get(url);
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

export function apiGetProfiles(specialityId, args) {
  const url = getUrl({startUrl: 'api/profiles/' + specialityId, ...args});
  return axios.get(url);
}
