import { change } from 'redux-form';

import { formName }  from '../employment.container';
import { fetching } from '../../busyIndicator';
import { apiGetSchools } from '../../layout';
import {
  SET_SCHOOLS_SUGGESTIONS,
  CLEAR_SCHOOLS_SUGGESTIONS
} from '../../../constants';

const onGetSchoolsSuggestions = value => dispatch => {
  return fetching(dispatch, formName,
    apiGetSchools({ limit: 20, search: value, sorting: [{columnName: 'name'}] })
      .then(res =>
        dispatch({ type: SET_SCHOOLS_SUGGESTIONS, data: res.data })
      )
  );
};

const onClearSchoolsSuggestions = () => ({ type: CLEAR_SCHOOLS_SUGGESTIONS });

const onSchoolSelected = (row, type) => dispatch => data => {
  dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'SchoolName', data.name));
  dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'SchoolId', data.id));
};

const onClearSchoolSelected = (row, type) => dispatch => () => {
  dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'SchoolName', ''));
  dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'SchoolId', null));
};

export {
  onGetSchoolsSuggestions,
  onClearSchoolsSuggestions,
  onSchoolSelected,
  onClearSchoolSelected
};
