import axios from 'axios';
import getUrl from './configUrl';

export function apiGetSpecialities({...args}) {
  let url = getUrl({startUrl: 'api/specialities', ...args});
  return axios.get(url).then(response => response);
}

export function apiGetEduForms({...args}) {
  let url = getUrl({startUrl: 'api/eduforms', ...args});
  return axios.get(url).then(response => response);
}

export function apiGetPgTypes(id) {
  let url = getUrl({startUrl: 'api/pgtypes/' + id});
  return axios.get(url).then(response => response);
}
