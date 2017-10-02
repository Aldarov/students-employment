import axios from 'axios';

export function apiLoadSpecialities() {
  return axios.get('api/specialities?_sort=name').then(response => response);
}
