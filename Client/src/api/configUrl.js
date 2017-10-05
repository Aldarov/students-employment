export default function getUrl({startUrl, page, limit, sorting, search, ...filters}) {
  let url = startUrl + '?';
  if (limit) {
    url = url + '_limit=' + limit + '&';
  }

  if (page) {
    url = url + '_page=' + page + '&';
  }

  if (search) {
    url = url + 'q=' + search + '&';
  }

  if (sorting) {
    let sort = '';
    let order = '';
    sorting.forEach(function(el) {
      sort = sort + el.columnName + ',';
      order = order + el.direction + ',';
    }, this);
    sort = sort.slice(0,-1);
    order = order.slice(0,-1);
    if (sort || order)
      url = url + '_sort=' + sort + '&' + '_order=' + order + '&';
  }

  if (filters.id) {
    url = url + 'id=' + filters.id + '&';
  }

  return url.slice(0,-1);
}
