import axios from 'axios';
import getUrl from './configUrl';

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
