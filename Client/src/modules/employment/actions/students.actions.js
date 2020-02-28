import isEmpty from 'lodash/isEmpty';
import {
  change,
  touch,
  getFormValues,
  arrayPush
} from 'redux-form';
import Alert from 'react-s-alert';

import { formName }  from '../employment.container';
import { fetching } from '../../busyIndicator';
import {
  apiGetStudentsByHeader,  apiGetStudentsWithoutSelected
} from '../students.api';
import {
  SET_STUDENTS_SELECTION,
  CLEAR_STUDENTS_SELECTION,
  OPEN_STUDENTS_SELECTION,
  CLOSE_STUDENTS_SELECTION
} from '../../../constants';
import { validate } from '.';
import { apiCheckExistHeader } from '../employment.api';
import throwError from '../../_global/helpers/throwError';

const addStudents = () => async (dispatch, getState) => {
  const state = getState();
  const formValues = getFormValues(formName)(state);

  let { entraceYear, eduFormId, specialityId, specializationId, groupId } = formValues;
  if (specializationId == 0) specializationId = null;
  if (groupId == 0) groupId = null;
  const exceptedIds = formValues && formValues.pgContractStuffs &&
    formValues.pgContractStuffs.map( item => item.studentId );

  const students = await fetching(dispatch, formName,
    apiGetStudentsWithoutSelected(entraceYear, eduFormId, specialityId, specializationId, groupId, exceptedIds));
  throwError(students);

  dispatch({ type: SET_STUDENTS_SELECTION, data: students });
  dispatch({ type: OPEN_STUDENTS_SELECTION });

  return students;
};

const onCloseStudentsSelection = () => dispatch => {
  dispatch({ type: CLEAR_STUDENTS_SELECTION });
  dispatch({ type: CLOSE_STUDENTS_SELECTION });
};

const getNewContractStuff = (headerId, studentId, student) => {
  let res = {
    studentId: studentId,
    directionTypeId: null,
    distributionTypeId: null,
    directionOrganizationId: null,
    distributionOrganizationId: null,
    directionSchoolId: null,
    distributionSchoolId: null,
    jobOnSpeciality: false,
    directionOrganizationName: null,
    distributionOrganizationName: null,
    directionSchoolName: null,
    distributionSchoolName: null,
    student: student
  };
  if (headerId) {
    res = {
      ...res,
      pgHeaderId: headerId
    };
  }
  return res;
};

const getStudentsByHeader = (year, educationFormId, specialityId, specializationId, groupId, formName) => dispatch => {
  return fetching(dispatch, formName,
    apiGetStudentsByHeader(year, educationFormId, specialityId, specializationId, groupId));
};

const checkExistHeader = (data) => (dispatch) => {
  return fetching(dispatch, formName, apiCheckExistHeader(data));
};

const onLoadStudents = (id) => () => async (dispatch, getState) => {
  const state = getState();
  const formValues = getFormValues(formName)(state);
  const errors = dispatch(validate());

  if (!isEmpty(errors)) {
    for (var err in errors) {
      dispatch(touch(formName, err));
    }
  } else {
    const result = await dispatch(checkExistHeader(formValues));
    throwError(result);

    let { entraceYear, eduFormId, specialityId, specializationId, groupId } = formValues;
    if (specializationId == 0) specializationId = null;
    if (groupId == 0) groupId = null;

    const data = await dispatch(getStudentsByHeader(entraceYear, eduFormId, specialityId, specializationId, groupId, formName));
    throwError(data);
    if (data.length > 0)
    {
      const stuff = data.map(item => getNewContractStuff(id, item.studentId, item));
      dispatch(change(formName, 'pgContractStuffs', stuff));
    }
    else {
      Alert.error('По указанным данным не найдено ни одного студента');
    }
  }
};

const onStudentsSelected = (id) => (selection) => (dispatch) => {
  if (Array.isArray(selection) && selection.length > 0) {
    selection.forEach(item => dispatch(arrayPush(formName, 'pgContractStuffs', getNewContractStuff(id, item.studentId, item))));
    dispatch(onCloseStudentsSelection());
  }
};

export {
  addStudents,
  onLoadStudents,
  onStudentsSelected,
  onCloseStudentsSelection
};
