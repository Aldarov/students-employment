import axios from 'axios';

const startUrl = 'api/placements';

export function apiGetEmploymentById(id) {
  return axios.get(startUrl + `/${id}`);
}

export function apiPostEmployment(data) {
  return axios.post(startUrl, data);
}
