import axios from 'axios';
import getUrl from './configUrl';

export function apiGetSpecialities({...args}) {
  let url = getUrl({startUrl: 'api/specialities', ...args});
  return axios.get(url).then(response => response);
}
