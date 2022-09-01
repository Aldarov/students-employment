import { change } from 'redux-form';

import { formName }  from '../employment.container';
import { fetching } from '../../busyIndicator';
import { apiGetSpecialities, clearProfiles, getProfiles, getGroups, clearGroups } from '../../layout';
import {
  SET_SPECIALITIES_SUGGESTIONS,
  CLEAR_SPECIALITIES_SUGGESTIONS,
} from '../../../constants';

const onGetSpecialitySuggestions = (value) => (dispatch) => {
  return fetching(dispatch, formName,
    apiGetSpecialities({ limit: 20, search: value, sorting: [{columnName: 'name'}] })
      .then(res => dispatch({ type: SET_SPECIALITIES_SUGGESTIONS, data: res.data }))
  );
};

const onClearSpecialitySuggestions = () => ({ type: CLEAR_SPECIALITIES_SUGGESTIONS });

const onClearSpecialitySelectedSuggestion = () => (dispatch) => {
  dispatch(change(formName, 'speciality', ''));
  dispatch(change(formName, 'specialityId', null));
  dispatch(change(formName, 'specializationId', 0));
  dispatch(clearProfiles());
  dispatch(clearGroups());
};

const onSpecialitySelected = (data) => (dispatch) => {
  dispatch(change(formName, 'speciality', data.name));
  dispatch(change(formName, 'specialityId', data.id));
  dispatch(change(formName, 'specializationId', null));
  dispatch(getProfiles(data.id, { sorting: [{columnName: 'specialityID'}, {columnName: 'name'}] }));
  dispatch(getGroups(data.id, { sorting: [{columnName: 'lastYear'}, {columnName: 'name'}] }));
};


export {
  onGetSpecialitySuggestions,
  onClearSpecialitySuggestions,
  onClearSpecialitySelectedSuggestion,
  onSpecialitySelected
};
