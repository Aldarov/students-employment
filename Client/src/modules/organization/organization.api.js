import axios from 'axios';

const startUrl = 'api/organizations';

export function apiGetOrganizationById(id) {
  return axios.get(startUrl + `/${id}`);
}

export function apiPostOrganization(data) {
  return axios.post(startUrl, data);
}
