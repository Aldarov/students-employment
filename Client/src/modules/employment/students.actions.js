import { fetching } from '../busyIndicator';
import {
  apiGetStudentsByHeader,  apiGetStudentsWithoutSelected
} from './students.api';
import {
  SET_STUDENTS_SELECTION,
  CLEAR_STUDENTS_SELECTION,
  OPEN_STUDENTS_SELECTION,
  CLOSE_STUDENTS_SELECTION
} from '../../constants';

export function getStudentsByHeader(year, educationFormId, specialityId, specializationId, formName) {
  return dispatch => fetching(dispatch, formName,
    apiGetStudentsByHeader(year, educationFormId, specialityId, specializationId));
}

export function getStudentsWithoutSelected(year, educationFormId, specialityId, specializationId, exceptedIds, formName) {
  return dispatch => fetching(dispatch, formName,
    apiGetStudentsWithoutSelected(year, educationFormId, specialityId, specializationId, exceptedIds).then(res => {
      dispatch({ type: SET_STUDENTS_SELECTION, data: res });
      return res;
    }));
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
