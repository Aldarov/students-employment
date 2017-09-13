import axios from 'axios';

export function apiGetEmployment({page, limit, sort, order, search, ...other}) {
  let url = 'api/placements?';
  if (limit) {
    url = url + '_limit=' + limit + '&';
  }
  if (page) {
    url = url + '_page=' + page + '&';
  }
  if (sort) {
    url = url + '_sort=' + sort + '&';
  }
  if (order) {
    url = url + '_order=' + order + '&';
  }
  if (search) {
    url = url + 'q=' + search + '&';
  }
  if (other.id) {
    url = url + 'id=' + other.id + '&';
  }
  return axios.get(url)
    .then(response => {
      return response;
    });
}
