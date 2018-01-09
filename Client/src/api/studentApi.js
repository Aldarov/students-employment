import axios from 'axios';
const startUrl = 'api/students';

export function apiGetStudentsByHeader(year, educationFormId, specialityId) {
  return axios.get(startUrl + `?year=${year}&educationFormId=${educationFormId}&specialityId=${specialityId}`);
}

export function apiGetStudentsWithoutSelected(year, educationFormId, specialityId, exceptedIds) {
  const params = exceptedIds.reduce((prev, curr) => {
    return prev + '&w=' + curr;
  });
  const url = startUrl + '/GetStudentsWithoutSelected' + `?year=${year}&educationFormId=${educationFormId}&specialityId=${specialityId}` + (params && '&w=' + params);
  return axios.get(url);
}
