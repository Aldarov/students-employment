import { fetchingAction } from './';
import {
  apiGetStudentsByHeader,  apiGetStudentsWithoutSelected
} from '../api';

export const SET_STUDENTS_SELECTION = 'SET_STUDENTS_SELECTION';
export const CLEAR_STUDENTS_SELECTION = 'CLEAR_STUDENTS_SELECTION';
export const OPEN_STUDENTS_SELECTION = 'OPEN_STUDENTS_SELECTION';
export const CLOSE_STUDENTS_SELECTION = 'CLOSE_STUDENTS_SELECTION';

export function getStudentsByHeader(year, educationFormId, specialityId, callback) {
  return dispatch => fetchingAction(dispatch, apiGetStudentsByHeader(year, educationFormId, specialityId)
    .then(res => callback(res)));
}

export function getStudentsWithoutSelected(year, educationFormId, specialityId, exceptedIds) {
  return dispatch => fetchingAction(dispatch, apiGetStudentsWithoutSelected(year, educationFormId, specialityId, exceptedIds)
    .then(res =>
      dispatch({ type: SET_STUDENTS_SELECTION, data: res })
    ));
}

export function clearStudentSelection() {
  return dispatch => dispatch({ type: CLEAR_STUDENTS_SELECTION });
}

export function openStudentsSelection() {
  return dispatch => dispatch({ type: OPEN_STUDENTS_SELECTION });
}

export function closeStudentsSelection() {
  return dispatch => dispatch({ type: CLOSE_STUDENTS_SELECTION });
}
